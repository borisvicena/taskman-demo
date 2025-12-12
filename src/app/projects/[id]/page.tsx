"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/app/pages";
import { getProjectById, mockUsers, mockProjects } from "@/lib/mock-data";
import type { Project, Task } from "@/lib/types";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  // In a real app, this would be fetched from an API
  const [project, setProject] = React.useState<Project | undefined>(() =>
    getProjectById(projectId) || mockProjects.find(p => p.id === projectId)
  );

  if (!project) {
    notFound();
  }

  const handleBack = () => {
    router.push("/");
  };

  const handleCreateTask = (data: {
    name: string;
    description: string;
    status: Task["status"];
    priority: Task["priority"];
    dueDate?: string;
  }) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      name: data.name,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      projectId: projectId,
      subtasks: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProject({
      ...project,
      tasks: [...project.tasks, newTask],
      totalTaskCount: project.totalTaskCount + 1,
    });
  };

  const handleInviteMember = (memberId: string) => {
    const member = mockUsers.find(u => u.id === memberId);
    if (member && !project.members.find(m => m.id === memberId)) {
      setProject({
        ...project,
        members: [...project.members, member],
      });
    }
  };

  return (
    <ProjectDetailPage
      project={project}
      availableMembers={mockUsers}
      onBack={handleBack}
      onCreateTask={handleCreateTask}
      onInviteMember={handleInviteMember}
    />
  );
}
