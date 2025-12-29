// Types for TaskMan Project Management System

export type ProjectStatus = "Active" | "On-Hold" | "Completed";
export type TaskStatus =
  | "Not Started"
  | "In-Progress"
  | "Completed"
  | "On-Hold";
export type TaskPriority = "Low" | "Medium" | "High";
export type ProjectFilter = "All" | "Active" | "On-Hold" | "Completed";

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  content: string;
  createdAt: Date;
}

export interface Subtask {
  id: string;
  name: string;
  status: TaskStatus;
  parentTaskId: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  assignee?: User;
  projectId: string;
  subtasks: Subtask[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Member {
  userId: string;
  role: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  ownerId: string;
  members: Member[];
}
