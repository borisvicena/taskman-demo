"use client";

import * as React from "react";
import Link from "next/link";
// import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Pencil } from "lucide-react";
import {
  AssignMemberModal,
  AddCommentModal,
  UpdateStatusModal,
  CreateSubtaskModal,
} from "@/components/app/modals";
import { formatDate } from "@/lib/utils";
import type { Task, User as UserType, TaskStatus } from "@/lib/types";

interface TaskDetailPageProps {
  task: Task;
  projectId: string;
  projectName: string;
  projectMembers?: UserType[];
  onBack?: () => void;
  onEditTask?: () => void;
  onAssignMember?: (memberId: string) => void;
  onUpdateStatus?: (status: TaskStatus) => void;
  onAddComment?: (comment: string) => void;
  onCreateSubtask?: (name: string) => void;
  onEditSubtask?: (subtaskId: string) => void;
  onDeleteSubtask?: (subtaskId: string) => void;
}

function getPriorityVariant(
  priority: string,
): "default" | "secondary" | "outline" {
  switch (priority) {
    case "High":
      return "default";
    case "Medium":
      return "secondary";
    case "Low":
      return "outline";
    default:
      return "default";
  }
}

export function TaskDetailPage({
  task,
  projectId,
  projectName,
  projectMembers = [],
  onBack,
  onEditTask,
  onAssignMember,
  onUpdateStatus,
  onAddComment,
  onCreateSubtask,
  onEditSubtask,
  onDeleteSubtask,
}: TaskDetailPageProps) {
  const [isAssignModalOpen, setIsAssignModalOpen] = React.useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = React.useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = React.useState(false);
  const [isSubtaskModalOpen, setIsSubtaskModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Header /> */}

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Back button */}
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {projectName}
        </Link>

        {/* Task header card */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{task.title}</h2>
              <p className="mt-1 text-slate-500">{task.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={"default"}>{task.status}</Badge>
              <Badge variant={getPriorityVariant(task.priority)}>
                {task.priority}
              </Badge>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="h-4 w-4" />
                <div>
                  <span className="text-sm text-slate-500">Due date</span>
                  <br />
                  <span className="text-sm font-medium">
                    {task.dueDate ? formatDate(task.dueDate) : "Not set"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <User className="h-4 w-4" />
                <div>
                  <span className="text-sm text-slate-500">Assignee</span>
                  <br />
                  <span className="text-sm font-medium">
                    {task.assignedTo?.name || "Unassigned"}
                  </span>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(true)}
                  className="ml-1 p-1 hover:bg-slate-100 rounded"
                >
                  <Pencil className="h-3 w-3 text-slate-400" />
                </button>
              </div>
            </div>

            <Button variant="outline" onClick={onEditTask}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Task
            </Button>
          </div>
        </div>

        {/* Subtasks section */}
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Subtasks</h3>
            <Button onClick={() => setIsSubtaskModalOpen(true)}>
              Create Subtask
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-900">
                    Task Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-900">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {task.subtasks.map((subtask) => (
                  <tr
                    key={subtask.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 px-4 text-slate-900">{subtask.title}</td>
                    <td className="py-3 px-4">
                      <Badge variant={"default"}>{subtask.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditSubtask?.(subtask.id)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDeleteSubtask?.(subtask.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>

            {/* {task.subtasks.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-slate-500">No subtasks yet</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsSubtaskModalOpen(true)}
                >
                  Create your first subtask
                </Button>
              </div>
            )} */}
          </div>
        </div>

        {/* Comments section */}
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Comments</h3>
            <Button onClick={() => setIsCommentModalOpen(true)}>
              Add Comment
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-900">
                    Member
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-900">
                    Comment
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-900">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {task.comments.map((comment) => (
                  <tr
                    key={comment._id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
                          {comment.user.initials}
                        </div>
                        <span className="text-slate-900">
                          {comment.user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {comment.content}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {formatDate(comment.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {task.comments.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-slate-500">No comments yet</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsCommentModalOpen(true)}
                >
                  Add the first comment
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <AssignMemberModal
        open={isAssignModalOpen}
        onOpenChange={setIsAssignModalOpen}
        onSubmit={onAssignMember}
        projectMembers={projectMembers}
      />

      <UpdateStatusModal
        open={isStatusModalOpen}
        onOpenChange={setIsStatusModalOpen}
        onSubmit={onUpdateStatus}
        currentStatus={task.status}
      />

      <AddCommentModal
        open={isCommentModalOpen}
        onOpenChange={setIsCommentModalOpen}
        onSubmit={onAddComment}
      />

      <CreateSubtaskModal
        open={isSubtaskModalOpen}
        onOpenChange={setIsSubtaskModalOpen}
        onSubmit={onCreateSubtask}
      />
    </div>
  );
}
