import { Project } from "@/lib/types";
import Toolbar from "./toolbar";
import { ListCard } from "./list-card";
import { redirect } from "next/navigation";

interface HomeContentProps {
  projects: Project[];
}
export function HomeContent({ projects }: HomeContentProps) {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <header className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Projects
            </h1>
          </header>
          <Toolbar />

          {projects && (
            <div className="grid grid-cols-3 gap-2">
              {projects.map((project: Project) => (
                <ListCard key={project._id} list={project} />
              ))}
            </div>
          )}

          {!projects && (
            <div className="grid grid-cols-3 gap-2">EMPTY PROJECTS</div>
          )}
        </div>
      </div>
    </main>
  );
}
