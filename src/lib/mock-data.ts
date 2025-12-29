import type { Project, Task, User, Comment, Subtask } from "@/lib/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "David Lee",
    email: "david.lee@example.com",
    initials: "DL",
  },
  {
    id: "user-2",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    initials: "ED",
  },
  {
    id: "user-3",
    name: "Frank Miller",
    email: "frank.miller@example.com",
    initials: "FM",
  },
  {
    id: "user-4",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    initials: "AJ",
  },
  {
    id: "user-5",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    initials: "BS",
  },
];

// Mock Comments
const mockComments: Comment[] = [
  {
    id: "comment-1",
    userId: "user-2",
    user: mockUsers[1],
    content: "Include color pallete in the mockups",
    createdAt: new Date("2025-11-15"),
  },
  {
    id: "comment-2",
    userId: "user-3",
    user: mockUsers[2],
    content: "Change the font and size",
    createdAt: new Date("2025-09-15"),
  },
];

// Mock Subtasks
const mockSubtasks: Subtask[] = [
  {
    id: "subtask-1",
    name: "Wireframes",
    status: "Completed",
    parentTaskId: "task-2",
  },
  {
    id: "subtask-2",
    name: "High-fidelity mockups",
    status: "In-Progress",
    parentTaskId: "task-2",
  },
];

// Mock Tasks
const mockTasks: Task[] = [
  {
    id: "task-1",
    name: "Requirements gathering",
    description: "Define all app requirements and features",
    status: "Completed",
    priority: "High",
    dueDate: new Date("2025-11-05"),
    assignee: mockUsers[1],
    projectId: "project-2",
    subtasks: [
      {
        id: "subtask-3",
        name: "User research",
        status: "Completed",
        parentTaskId: "task-1",
      },
      {
        id: "subtask-4",
        name: "Feature-specification",
        status: "Completed",
        parentTaskId: "task-1",
      },
    ],
    comments: [],
    createdAt: new Date("2025-10-01"),
    updatedAt: new Date("2025-11-05"),
  },
  {
    id: "task-2",
    name: "UI/UX Design",
    description: "Design the mobile app interface",
    status: "In-Progress",
    priority: "High",
    dueDate: new Date("2025-11-25"),
    assignee: mockUsers[0],
    projectId: "project-2",
    subtasks: mockSubtasks,
    comments: mockComments,
    createdAt: new Date("2025-10-15"),
    updatedAt: new Date("2025-11-20"),
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: "project-1",
    name: "Website Redesign",
    description:
      "Complete overhaul of company website with modern design and improved UX",
    status: "Active",
    progress: 65,
    dueDate: new Date("2025-12-15"),
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    tasks: [],
    completedTaskCount: 1,
    totalTaskCount: 3,
    createdAt: new Date("2025-09-01"),
    updatedAt: new Date("2025-11-20"),
  },
  {
    id: "project-2",
    name: "Mobile App Development",
    description: "Build a native mobile app for iOS and Android",
    status: "Active",
    progress: 30,
    dueDate: new Date("2026-03-30"),
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    tasks: mockTasks,
    completedTaskCount: 1,
    totalTaskCount: 2,
    createdAt: new Date("2025-10-01"),
    updatedAt: new Date("2025-11-20"),
  },
  {
    id: "project-3",
    name: "Marketing Campaign Q4",
    description: "Launch comprehensive marketing campaign for Q4 2025",
    status: "Active",
    progress: 80,
    dueDate: new Date("2025-12-31"),
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    tasks: [],
    completedTaskCount: 1,
    totalTaskCount: 2,
    createdAt: new Date("2025-10-15"),
    updatedAt: new Date("2025-11-18"),
  },
  {
    id: "project-4",
    name: "Database Migration",
    description: "Migrate legacy database to new cloud infrastructure",
    status: "On-Hold",
    progress: 15,
    dueDate: new Date("2026-02-28"),
    members: [mockUsers[0], mockUsers[1]],
    tasks: [],
    completedTaskCount: 1,
    totalTaskCount: 2,
    createdAt: new Date("2025-11-01"),
    updatedAt: new Date("2025-11-10"),
  },
];

// Get a specific project by ID
export function getProjectById(id: string): Project | undefined {
  return mockProjects.find((p) => p.id === id);
}

// Get a specific task by ID
export function getTaskById(taskId: string): Task | undefined {
  for (const project of mockProjects) {
    const task = project.tasks.find((t) => t.id === taskId);
    if (task) return task;
  }
  return undefined;
}

// Get project containing a task
export function getProjectByTaskId(taskId: string): Project | undefined {
  for (const project of mockProjects) {
    const task = project.tasks.find((t) => t.id === taskId);
    if (task) return project;
  }
  return undefined;
}
