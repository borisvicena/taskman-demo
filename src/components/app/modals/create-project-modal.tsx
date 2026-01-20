"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import type { ProjectStatus, User } from "@/lib/types";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: {
    name: string;
    description: string;
    dueDate?: string;
    status: ProjectStatus;
    memberIds: string[];
  }) => void;
  availableMembers?: User[];
}

export function CreateProjectModal({
  open,
  onOpenChange,
  onSubmit,
  availableMembers = [],
}: CreateProjectModalProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [status, setStatus] = React.useState<ProjectStatus | "">("");
  const [memberSearch, setMemberSearch] = React.useState("");
  const [addedMembers, setAddedMembers] = React.useState<User[]>([]);

  const handleAddMember = () => {
    const member = availableMembers.find(
      (m) =>
        m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
        m.email.toLowerCase().includes(memberSearch.toLowerCase()),
    );
    if (member && !addedMembers.find((m) => m._id === member._id)) {
      setAddedMembers([...addedMembers, member]);
      setMemberSearch("");
    }
  };

  const handleSubmit = () => {
    if (!name || !status) return;
    onSubmit?.({
      name,
      description,
      dueDate: dueDate || undefined,
      status: status as ProjectStatus,
      memberIds: addedMembers.map((m) => m._id),
    });
    // Reset form
    setName("");
    setDescription("");
    setDueDate("");
    setStatus("");
    setAddedMembers([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create project
          </DialogTitle>
          <DialogDescription className="text-blue-600">
            Provide information about your project
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="name" className="text-right text-slate-600">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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

          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="status" className="text-right text-slate-600">
              Status
            </Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as ProjectStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On-Hold">On-Hold</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-[100px_1fr] items-start gap-4">
            <Label className="text-right text-slate-600 pt-2">
              Invite
              <br />
              members
            </Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Find members"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddMember} size="sm">
                  Add
                </Button>
              </div>
              {addedMembers.length > 0 && (
                <p className="text-sm text-blue-600">
                  {addedMembers.length} member
                  {addedMembers.length > 1 ? "s" : ""} added
                </p>
              )}
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
