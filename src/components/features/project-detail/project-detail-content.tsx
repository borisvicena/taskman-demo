"use client";

import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { ProjectHeader } from "./project-header";
import { Project } from "@/lib/types";
import { ProjectTasks } from "./project-tasks";

export function ProjectDetailContent({
  project,
  tasks,
  isOwner,
}: {
  project: Project;
  tasks: any;
  isOwner: boolean;
}) {
  return (
    <div className="space-y-8">
      <Link
        href="/dashboard"
        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
        aria-label="Back to projects"
      >
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Projects</span>
      </Link>

      <ProjectHeader project={project} isOwner={isOwner} />

      <ProjectTasks project={project} tasks={tasks} />
    </div>
  );
}
