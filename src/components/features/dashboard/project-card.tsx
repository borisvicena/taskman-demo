import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Users, CalendarClock } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "../../ui/progress";
import { verifySession } from "@/lib/dal";
import { formatDistance } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteProjectButton from "./delete-project-button";

interface ProjectCardProps {
  project: Project;
}

export async function ProjectCard({ project }: ProjectCardProps) {
  const session = await verifySession();
  const userId = session.userId;

  // Count members + owner
  const membersCount = project.members.length + 1;

  // Items
  // const allItems = list.items?.length ?? 0;
  // const completedItems = list.items?.filter((i: Project) => i.is_completed).length ?? 0;
  // const pendingItems = allItems - completedItems;

  return (
    <Card className="group">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>

        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="List actions"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/projects/${project._id}`}
                  className="cursor-pointer"
                >
                  Open Project
                </Link>
              </DropdownMenuItem>
              {userId === project.ownerId && (
                <DeleteProjectButton
                  projectId={project._id}
                  projectName={project.name}
                />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      <CardContent>
        <span className="text-xs">Progress</span>
        <Progress value={30} />
      </CardContent>

      <CardFooter className="justify-between text-xs">
        <div className="inline-flex justify-center items-center gap-1 text-neutral-500">
          <Users className="h-4 w-4" />
          <span>{membersCount}</span>
        </div>

        <div className="inline-flex justify-center items-center gap-1 text-neutral-500">
          <CalendarClock className="h-4 w-4" />
          <span>
            {formatDistance(project.createdAt, new Date(), { addSuffix: true })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
