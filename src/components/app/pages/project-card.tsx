import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckSquare, Users, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

function getStatusVariant(
  status: ProjectStatus,
): "default" | "secondary" | "outline" {
  switch (status) {
    case "active":
      return "default";
    case "on-hold":
      return "secondary";
    case "done":
      return "outline";
    default:
      return "default";
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project._id}`}
      className="block cursor-pointer rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-slate-900">{project.name}</h3>
        <Badge variant={getStatusVariant(project.status)}>
          {project.status}
        </Badge>
      </div>

      <p className="mt-2 text-sm text-slate-500 line-clamp-2">
        {project.description}
      </p>

      {/* <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="mt-1" />
      </div> */}

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        {/* <div className="flex items-center gap-1">
          <CheckSquare className="h-4 w-4" />
          <span>
            {project.completedTaskCount}/{project.totalTaskCount} tasks
          </span>
        </div> */}

        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{project.members.length}</span>
        </div>

        {project.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Due: {formatDate(project.dueDate)}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
