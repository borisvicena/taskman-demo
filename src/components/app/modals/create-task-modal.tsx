"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import type { TaskStatus, TaskPriority } from "@/lib/types";

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: {
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
  }) => void;
}

export function CreateTaskModal({ open, onOpenChange, onSubmit }: CreateTaskModalProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState<TaskStatus | "">("");
  const [priority, setPriority] = React.useState<TaskPriority | "">("");
  const [dueDate, setDueDate] = React.useState("");

  const handleSubmit = () => {
    if (!name || !status || !priority) return;
    onSubmit?.({
      name,
      description,
      status: status as TaskStatus,
      priority: priority as TaskPriority,
      dueDate: dueDate || undefined,
    });
    // Reset form
    setName("");
    setDescription("");
    setStatus("");
    setPriority("");
    setDueDate("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create task</DialogTitle>
          <DialogDescription className="text-blue-600">Add a new task to your project</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="name" className="text-right text-slate-600">
              Name
            </Label>
            <Input id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="description" className="text-right text-slate-600">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="status" className="text-right text-slate-600">
              Status
            </Label>
            <Select value={status} onValueChange={(v) => setStatus(v as TaskStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In-Progress">In-Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="importance" className="text-right text-slate-600">
              Importance
            </Label>
            <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
              <SelectTrigger>
                <SelectValue placeholder="Select importance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="dueDate" className="text-right text-slate-600">
              Due date
            </Label>
            <div className="relative">
              <Input
                id="dueDate"
                type="date"
                placeholder="Pick date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
}
