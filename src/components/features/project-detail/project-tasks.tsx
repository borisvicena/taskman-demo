import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/lib/types";
import { DataTable } from "@/app/dashboard/projects/[id]/data-table";
import { columns } from "@/app/dashboard/projects/[id]/columns";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddTaskForm from "./forms/add-task-form";
import { useState } from "react";

type ProjectTasksProps = {
  project: Project;
  tasks: any;
};

export function ProjectTasks({ project, tasks }: ProjectTasksProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>

        <CardAction>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
              <AddTaskForm
                projectId={project._id}
                onSuccess={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>

      <CardContent>
        <DataTable columns={columns} data={tasks} />
      </CardContent>
    </Card>
  );
}
