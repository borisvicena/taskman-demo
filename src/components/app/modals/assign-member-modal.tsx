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
import type { User } from "@/lib/types";

interface AssignMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (memberId: string) => void;
  projectMembers?: User[];
}

export function AssignMemberModal({
  open,
  onOpenChange,
  onSubmit,
  projectMembers = [],
}: AssignMemberModalProps) {
  const [memberSearch, setMemberSearch] = React.useState("");

  const handleSubmit = () => {
    const member = projectMembers.find(
      (m) =>
        m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
        m.email.toLowerCase().includes(memberSearch.toLowerCase()),
    );
    if (member) {
      onSubmit?.(member.id);
      setMemberSearch("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Assign to</DialogTitle>
          <DialogDescription className="text-blue-600">
            Find and assign this task to a new member
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="member" className="text-slate-600">
              Find member
            </Label>
            <Input
              id="member"
              placeholder="Member"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
            />
            <p className="text-sm text-slate-500">
              Find members by email or name.
            </p>
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Assign
        </Button>
      </DialogContent>
    </Dialog>
  );
}
