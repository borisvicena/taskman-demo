"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TaskStatus } from "@/lib/types";

interface UpdateStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (status: TaskStatus) => void;
  currentStatus?: TaskStatus;
}

export function UpdateStatusModal({ open, onOpenChange, onSubmit, currentStatus }: UpdateStatusModalProps) {
  const [status, setStatus] = React.useState<TaskStatus | "">(currentStatus || "");

  React.useEffect(() => {
    if (currentStatus) {
      setStatus(currentStatus);
    }
  }, [currentStatus]);

  const handleSubmit = () => {
    if (!status) return;
    onSubmit?.(status as TaskStatus);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Update status</DialogTitle>
          <DialogDescription className="text-blue-600">Change the status of this task</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status" className="text-slate-600">
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
            <p className="text-sm text-slate-500">Choose a new status</p>
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
}
