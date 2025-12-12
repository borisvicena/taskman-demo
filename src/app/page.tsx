"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ProjectsListPage } from "@/components/app/pages";
import { mockProjects, mockUsers } from "@/lib/mock-data";
import type { Project } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [projects, setProjects] = React.useState<Project[]>(mockProjects);

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

    // Navigate to the new project
    router.push(`/projects/${newProject.id}`);
  };

  return (
    <ProjectsListPage
      projects={projects}
      availableMembers={mockUsers}
      onCreateProject={handleCreateProject}
    />
  );
}
