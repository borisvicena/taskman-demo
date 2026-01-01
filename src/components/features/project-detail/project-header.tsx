import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

type ProjectHeaderProps = {
  project: Project;
  isOwner: boolean;
};

export function ProjectHeader({ project, isOwner }: ProjectHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <span className="text-xs text-neutral-500">Progress</span>
        <Progress value={30} />
      </CardContent>

      <CardFooter>
        {project.dueDate && (
          <div>
            <span className="text-xs text-neutral-500 font-bold">Due Date</span>
            <span>{format(project.dueDate, "MM/dd/yyyy")}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
