"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./project-card";
import { CreateProjectModal } from "@/components/app/modals";
import type { Project, ProjectFilter, User } from "@/lib/types";

interface ProjectsListPageProps {
  projects: Project[];
  availableMembers?: User[];
  onCreateProject?: (data: {
    name: string;
    description: string;
    dueDate?: string;
    status: string;
    memberIds: string[];
  }) => void;
  onProjectClick?: (projectId: string) => void;
}

export function ProjectsListPage({
  projects,
  availableMembers = [],
  onCreateProject,
  onProjectClick,
}: ProjectsListPageProps) {
  const [filter, setFilter] = React.useState<ProjectFilter>("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const filters: ProjectFilter[] = ["All", "Active", "On-Hold", "Completed"];

  const filteredProjects = React.useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.status === filter);
  }, [projects, filter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === f
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <Button onClick={() => setIsCreateModalOpen(true)}>Create new</Button>
        </div>

        <div className="mt-6 border-t border-slate-200" />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={() => onProjectClick?.(project.id)} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-slate-500">No projects found</p>
            <Button variant="outline" className="mt-4" onClick={() => setIsCreateModalOpen(true)}>
              Create your first project
            </Button>
          </div>
        )}
      </main>

      <CreateProjectModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={onCreateProject}
        availableMembers={availableMembers}
      />
    </div>
  );
}
