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

interface AddCommentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (comment: string) => void;
}

export function AddCommentModal({
  open,
  onOpenChange,
  onSubmit,
}: AddCommentModalProps) {
  const [comment, setComment] = React.useState("");

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit?.(comment);
    setComment("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Comment
          </DialogTitle>
          <DialogDescription className="text-blue-600">
            Add a comment to this task
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-slate-600">
              Comment
            </Label>
            <Input
              id="comment"
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <p className="text-sm text-slate-500">Write your comment</p>
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Comment
        </Button>
      </DialogContent>
    </Dialog>
  );
}
