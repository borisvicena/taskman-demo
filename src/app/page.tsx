"use client";

import * as React from "react";
import { ProjectsListPage, ProjectDetailPage, TaskDetailPage } from "@/components/app/pages";
import { mockProjects, mockUsers, getProjectById, getTaskById, getProjectByTaskId } from "@/lib/mock-data";
import type { Project, Task } from "@/lib/types";

type View = "projects" | "project-detail" | "task-detail";

export default function TaskManApp() {
  const [currentView, setCurrentView] = React.useState<View>("projects");
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = React.useState<string | null>(null);
  const [projects, setProjects] = React.useState<Project[]>(mockProjects);

  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId) || getProjectById(selectedProjectId)
    : null;

  const selectedTask = selectedTaskId ? getTaskById(selectedTaskId) : null;
  const taskProject = selectedTaskId ? getProjectByTaskId(selectedTaskId) : null;

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView("project-detail");
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setCurrentView("task-detail");
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    setCurrentView("projects");
  };

  const handleBackToProject = () => {
    setSelectedTaskId(null);
    setCurrentView("project-detail");
  };

  const handleCreateProject = (data: {
    name: string;
    description: string;
    dueDate?: string;
    status: string;
    memberIds: string[];
  }) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: data.name,
      description: data.description,
      status: data.status as Project["status"],
      progress: 0,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      members: mockUsers.filter((u) => data.memberIds.includes(u.id)),
      tasks: [],
      completedTaskCount: 0,
      totalTaskCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProjects([...projects, newProject]);
  };

  const handleCreateTask = (data: {
    name: string;
    description: string;
    status: Task["status"];
    priority: Task["priority"];
    dueDate?: string;
  }) => {
    if (!selectedProjectId) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      name: data.name,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      projectId: selectedProjectId,
      subtasks: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProjects(
      projects.map((p) =>
        p.id === selectedProjectId
          ? {
              ...p,
              tasks: [...p.tasks, newTask],
              totalTaskCount: p.totalTaskCount + 1,
            }
          : p
      )
    );
  };

  if (currentView === "task-detail" && selectedTask && taskProject) {
    return (
      <TaskDetailPage
        task={selectedTask}
        projectName={taskProject.name}
        projectMembers={taskProject.members}
        onBack={handleBackToProject}
        onAssignMember={(memberId) => {
          console.log("Assign member:", memberId);
        }}
        onUpdateStatus={(status) => {
          console.log("Update status:", status);
        }}
        onAddComment={(comment) => {
          console.log("Add comment:", comment);
        }}
        onCreateSubtask={(name) => {
          console.log("Create subtask:", name);
        }}
        onEditSubtask={(subtaskId) => {
          console.log("Edit subtask:", subtaskId);
        }}
        onDeleteSubtask={(subtaskId) => {
          console.log("Delete subtask:", subtaskId);
        }}
      />
    );
  }

  if (currentView === "project-detail" && selectedProject) {
    return (
      <ProjectDetailPage
        project={selectedProject}
        availableMembers={mockUsers}
        onBack={handleBackToProjects}
        onCreateTask={handleCreateTask}
        onInviteMember={(memberId) => {
          console.log("Invite member:", memberId);
        }}
        onTaskClick={handleTaskClick}
      />
    );
  }

  return (
    <ProjectsListPage
      projects={projects}
      availableMembers={mockUsers}
      onCreateProject={handleCreateProject}
      onProjectClick={handleProjectClick}
    />
  );
}
