"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteProject } from "@/lib/actions/project";

type Props = {
  projectId: string;
  projectName: string;
  onSuccess?: () => void;
};

export default function DeleteProjectForm({
  projectId,
  projectName,
  onSuccess,
}: Props) {
  const [state, action, pending] = useActionState(deleteProject, undefined);

  useEffect(() => {
    if (state?.success) {
      onSuccess?.();
    }
  }, [state, onSuccess]);

  return (
    <form action={action}>
      {/* Hidden input to pass the list ID */}
      <input type="hidden" name="id" value={projectId} />

      <DialogHeader>
        <DialogTitle>Delete Shopping List</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete <strong>"{projectName}"</strong>? This
          will permanently remove the list and all its items. This action cannot
          be undone.
        </DialogDescription>
      </DialogHeader>

      {state?.message && (
        <p className="py-4 text-sm text-destructive">{state.message}</p>
      )}

      <DialogFooter className="gap-2 sm:gap-0">
        {/* <Button type="button" variant="outline" onClick={() => onSuccess?.()} disabled={pending}>
					Cancel
				</Button> */}
        <Button type="submit" variant="destructive" disabled={pending}>
          {pending && <Spinner />}
          Delete List
        </Button>
      </DialogFooter>
    </form>
  );
}
