"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { TaskDetailPage } from "@/components/app/pages";
import { getProjectById, getTaskById, mockUsers, mockProjects } from "@/lib/mock-data";
import type { Task, TaskStatus, Subtask, Comment } from "@/lib/types";

export default function TaskPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const taskId = params.taskId as string;

  // In a real app, this would be fetched from an API
  const project = getProjectById(projectId) || mockProjects.find(p => p.id === projectId);
  const initialTask = project?.tasks.find(t => t.id === taskId) || getTaskById(taskId);

  const [task, setTask] = React.useState<Task | undefined>(initialTask);

  if (!project || !task) {
    notFound();
  }

  const handleBack = () => {
    router.push(`/projects/${projectId}`);
  };

  const handleAssignMember = (memberId: string) => {
    const member = mockUsers.find(u => u.id === memberId);
    if (member) {
      setTask({
        ...task,
        assignee: member,
        updatedAt: new Date(),
      });
    }
  };

  const handleUpdateStatus = (status: TaskStatus) => {
    setTask({
      ...task,
      status,
      updatedAt: new Date(),
    });
  };

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: mockUsers[0].id,
      user: mockUsers[0],
      content,
      createdAt: new Date(),
    };
    setTask({
      ...task,
      comments: [...task.comments, newComment],
      updatedAt: new Date(),
    });
  };

  const handleCreateSubtask = (name: string) => {
    const newSubtask: Subtask = {
      id: `subtask-${Date.now()}`,
      name,
      status: "Not Started",
      parentTaskId: task.id,
    };
    setTask({
      ...task,
      subtasks: [...task.subtasks, newSubtask],
      updatedAt: new Date(),
    });
  };

  const handleEditSubtask = (subtaskId: string) => {
    // In a real app, this would open an edit modal
    console.log("Edit subtask:", subtaskId);
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    setTask({
      ...task,
      subtasks: task.subtasks.filter(s => s.id !== subtaskId),
      updatedAt: new Date(),
    });
  };

  return (
    <TaskDetailPage
      task={task}
      projectId={projectId}
      projectName={project.name}
      projectMembers={project.members}
      onBack={handleBack}
      onAssignMember={handleAssignMember}
      onUpdateStatus={handleUpdateStatus}
      onAddComment={handleAddComment}
      onCreateSubtask={handleCreateSubtask}
      onEditSubtask={handleEditSubtask}
      onDeleteSubtask={handleDeleteSubtask}
    />
  );
}
