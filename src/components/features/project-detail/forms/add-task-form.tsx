"use client";

import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createTask } from "@/lib/actions/task";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  projectId: string;
  onSuccess?: () => void;
};

export default function AddTaskForm({ projectId, onSuccess }: Props) {
  const [state, action, pending] = useActionState(createTask, undefined);

  useEffect(() => {
    if (state?.success) {
      onSuccess?.();
    }
  }, [state, onSuccess]);

  return (
    <form action={action}>
      <DialogHeader>
        <DialogTitle>New Task</DialogTitle>
        <DialogDescription>Add a new task to your project.</DialogDescription>
      </DialogHeader>

      {/* Hidden input to pass the project ID */}
      <input type="hidden" name="projectId" value={projectId} />

      <div className="py-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Task Alpha"
            autoFocus
            tabIndex={1}
          />
          {state?.errors?.title && (
            <p className="text-sm text-destructive">{state.errors.title[0]}</p>
          )}
        </div>
      </div>

      <div className="py-4">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Super secret project"
            tabIndex={2}
          />
        </div>
      </div>

      <div className="py-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status">
            <SelectTrigger id="status" tabIndex={3} className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="py-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select name="priority">
            <SelectTrigger id="priority" tabIndex={4} className="w-full">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Priority</SelectLabel>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">Hight</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="py-4">
        <div className="space-y-2">
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Input
            id="assignedTo"
            name="assignedTo"
            placeholder="Super secret project"
            tabIndex={5}
          />
        </div>
      </div>

      <div className="py-4">
        <div className="space-y-2">
          <Label htmlFor="parentTaskId">Parent Task</Label>
          <Input
            id="parentTaskId"
            name="parentTaskId"
            placeholder="Super secret project"
            tabIndex={6}
          />
        </div>
      </div>

      <div className="py-4">
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            name="dueDate"
            placeholder="Super secret project"
            tabIndex={7}
          />
        </div>
      </div>

      {state?.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <DialogFooter>
        <Button type="submit" disabled={pending} tabIndex={3}>
          {pending && <Spinner />}
          Create
        </Button>
      </DialogFooter>
    </form>
  );
}
