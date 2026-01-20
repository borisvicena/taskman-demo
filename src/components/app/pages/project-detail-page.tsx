"use client";

import * as React from "react";
import Link from "next/link";
// import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Calendar,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { CreateTaskModal, InviteMemberModal } from "@/components/app/modals";
import { formatDate } from "@/lib/utils";
import type {
  Project,
  Task,
  User,
  TaskStatus,
  TaskPriority,
} from "@/lib/types";

interface ProjectDetailPageProps {
  project: Project;
  tasks?: Task[];
  availableMembers?: User[];
  onBack?: () => void;
  onCreateTask?: (data: {
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
  }) => void;
  onInviteMember?: (memberId: string) => void;
}

interface TaskRowProps {
  task: Task;
  projectId: string;
  level?: number;
}

function TaskRow({ task, projectId, level = 0 }: TaskRowProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const hasSubtasks = false; // task.subtasks && task.subtasks.length > 0;

  return (
    <>
      <tr className="border-b border-slate-100 hover:bg-slate-50">
        <td className="py-3 px-4">
          <div
            className="flex items-center gap-2"
            style={{ paddingLeft: `${level * 24}px` }}
          >
            {hasSubtasks ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="p-0.5 hover:bg-slate-200 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                )}
              </button>
            ) : (
              <div className="w-5" />
            )}
            <Link
              href={`/projects/${projectId}/tasks/${task._id}`}
              className="flex-1 hover:text-blue-600"
            >
              <p className="font-medium text-slate-900 hover:text-blue-600">
                {task.title}
              </p>
              {task.description && (
                <p className="text-sm text-slate-500">{task.description}</p>
              )}
            </Link>
          </div>
        </td>
        <td className="py-3 px-4 text-slate-600">
          {task.assignedTo?.name || "-"}
        </td>
        <td className="py-3 px-4">
          <Badge variant={"default"}>{task.status}</Badge>
        </td>
        <td className="py-3 px-4">
          {task.priority && <Badge variant={"default"}>{task.priority}</Badge>}
          {!task.priority && "-"}
        </td>
        <td className="py-3 px-4 text-slate-600">
          {task.dueDate ? formatDate(task.dueDate) : "-"}
        </td>
      </tr>
      {/* {hasSubtasks &&
        isExpanded &&
        task.subtasks.map((subtask) => (
          <tr
            key={subtask._id}
            className="border-b border-slate-100 hover:bg-slate-50 bg-slate-50/50"
          >
            <td className="py-3 px-4">
              <div
                className="flex items-center gap-2"
                style={{ paddingLeft: `${(level + 1) * 24 + 20}px` }}
              >
                <p className="text-slate-700">{subtask.title}</p>
              </div>
            </td>
            <td className="py-3 px-4 text-slate-600">-</td>
            <td className="py-3 px-4">
              <Badge variant={"default"}>{subtask.status}</Badge>
            </td>
            <td className="py-3 px-4 text-slate-600">-</td>
            <td className="py-3 px-4 text-slate-600">-</td>
          </tr>
        ))} */}
    </>
  );
}

export function ProjectDetailPage({
  project,
  tasks = [],
  availableMembers = [],
  onBack,
  onCreateTask,
  onInviteMember,
}: ProjectDetailPageProps) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] =
    React.useState(false);
  const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] =
    React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Header /> */}

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Project header card */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {project.name}
              </h2>
              <p className="mt-1 text-slate-500">{project.description}</p>
            </div>
            <Badge variant={"default"}>{project.status}</Badge>
          </div>

          {/* <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="mt-2" />
          </div> */}

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  <span className="text-slate-500">Due date</span>
                  <br />
                  {project.dueDate ? formatDate(project.dueDate) : "Not set"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <span className="text-sm text-slate-500">Team members</span>
                <br />
                <span className="text-sm text-slate-700">
                  {project.members.length} member{project.members.length !== 1 ? 's' : ''}
                </span>
              </div>
              <button
                onClick={() => setIsInviteMemberModalOpen(true)}
                className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:bg-slate-100"
              >
                <Users className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tasks section */}
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Tasks</h3>
            <Button onClick={() => setIsCreateTaskModalOpen(true)}>
              Create Task
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
                    Assigned To
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-900">
                    Priority
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-slate-900">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <TaskRow key={task._id} task={task} projectId={project._id} />
                ))}
              </tbody>
            </table>

            {tasks.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-slate-500">No tasks yet</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsCreateTaskModalOpen(true)}
                >
                  Create your first task
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <CreateTaskModal
        open={isCreateTaskModalOpen}
        onOpenChange={setIsCreateTaskModalOpen}
        onSubmit={onCreateTask}
      />

      <InviteMemberModal
        open={isInviteMemberModalOpen}
        onOpenChange={setIsInviteMemberModalOpen}
        onSubmit={onInviteMember}
        availableMembers={availableMembers}
      />
    </div>
  );
}
