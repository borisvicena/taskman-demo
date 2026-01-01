import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/lib/types";

type TaskHeaderProps = {
  task: Task;
};

export function TaskHeader({ task }: TaskHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>
          {task?.description || "No description"}
        </CardDescription>

        <CardAction>
          {task.status && <Badge>{task.status}</Badge>}
          {task.priority && <Badge>{task.priority}</Badge>}
        </CardAction>
      </CardHeader>
    </Card>
  );
}
