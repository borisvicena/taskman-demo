import { Project } from "@/lib/types";
import Toolbar from "./toolbar";
import { ProjectCard } from "./project-card";

interface DashboardContentProps {
  projects: Project[];
}

export function DashboardContent({ projects }: DashboardContentProps) {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Dashboard
        </h1>
      </header>

      <Toolbar />

      {projects && (
        <div className="grid grid-cols-3 gap-2">
          {projects.map((project: Project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      {!projects && <div className="grid grid-cols-3 gap-2">NO PROJECTS!</div>}
    </div>
  );
}
