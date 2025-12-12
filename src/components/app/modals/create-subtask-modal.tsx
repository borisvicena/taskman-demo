"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateSubtaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (name: string) => void;
}

export function CreateSubtaskModal({ open, onOpenChange, onSubmit }: CreateSubtaskModalProps) {
  const [name, setName] = React.useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit?.(name);
    setName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create Subtask</DialogTitle>
          <DialogDescription className="text-blue-600">Add a new subtask to this task</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-600">
              Name
            </Label>
            <Input id="name" placeholder="Subtask name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
}
