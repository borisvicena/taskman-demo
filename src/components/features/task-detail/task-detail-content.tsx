"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { TaskHeader } from "./task-header";
import { Task } from "@/lib/types";

type TaskDetailContentProps = {
  task: Task;
  project: Project;
};

export function TaskDetailContent({ project, task }: TaskDetailContentProps) {
  return (
    <main className="min-h-screen bg-linear-to-b from-zinc-50 to-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <Link
            href={`/dashboard/projects/${project._id}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
            aria-label="Back to project"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to {project.name}</span>
          </Link>

          <TaskHeader task={task} />

          {/* <ProjectTasks project={project} tasks={tasks} /> */}
        </div>
      </div>
    </main>
  );
}
