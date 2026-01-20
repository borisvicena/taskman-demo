# TaskMan CRUD API Documentation

This document describes all the server actions available for managing projects and tasks.

## Project Actions

All project actions are in `src/lib/actions/project.ts`

### Create Project

```typescript
import { createProject } from "@/lib/actions/project";

// Used with forms and useActionState
const [state, action, pending] = useActionState(createProject, undefined);

// FormData fields:
// - name: string (required)
// - description: string (optional)
// - status: "active" | "on-hold" | "done" (optional, defaults to "active")
// - dueDate: string (ISO date, optional)

// Returns:
// { success: true, projectId: string } on success
// { errors: { name: [...] } } for validation errors
// { message: string } for other errors
```

### Update Project

```typescript
import { updateProject } from "@/lib/actions/project";

// Call directly with projectId
const result = await updateProject(projectId, formData);

// FormData fields:
// - name: string (required)
// - description: string (optional)
// - status: "active" | "on-hold" | "done" (optional)
// - dueDate: string (ISO date, optional)

// Returns:
// { success: true } on success
// { error: string } on failure
```

### Delete Project

```typescript
import { deleteProject } from "@/lib/actions/project";

// Deletes project and ALL associated tasks
const result = await deleteProject(projectId);

// Returns:
// { success: true } on success
// { error: string } on failure
```

### Add Project Member

```typescript
import { addProjectMember } from "@/lib/actions/project";

// Add a member to a project (owner only)
const result = await addProjectMember(projectId, userId, role);

// role: "editor" | "viewer" (defaults to "viewer")
// - editors: can create, edit, delete tasks
// - viewers: can only view, cannot modify

// Returns:
// { success: true } on success
// { error: string } on failure
```

### Remove Project Member

```typescript
import { removeProjectMember } from "@/lib/actions/project";

// Remove a member from a project (owner only)
const result = await removeProjectMember(projectId, userId);

// Returns:
// { success: true } on success
// { error: string } on failure
```

### Update Member Role

```typescript
import { updateMemberRole } from "@/lib/actions/project";

// Update a member's role (owner only)
const result = await updateMemberRole(projectId, userId, role);

// role: "editor" | "viewer"

// Returns:
// { success: true } on success
// { error: string } on failure
```

## Task Actions

All task actions are in `src/lib/actions/task.ts`

### Create Task

```typescript
import { createTask } from "@/lib/actions/task";

// Create a task in a project
const result = await createTask(projectId, formData);

// FormData fields:
// - title: string (required)
// - description: string (optional)
// - status: "todo" | "in-progress" | "done" (optional, defaults to "todo")
// - priority: "low" | "medium" | "high" (optional, defaults to "medium")
// - assignedTo: string (userId, optional)
// - parentTaskId: string (for subtasks, optional)
// - dueDate: string (ISO date, optional)

// Returns:
// { success: true, taskId: string } on success
// { error: string } on failure

// Permissions:
// - Owner: can always create
// - Editor: can create
// - Viewer: cannot create
```

### Update Task

```typescript
import { updateTask } from "@/lib/actions/task";

// Update an existing task
const result = await updateTask(taskId, formData);

// FormData fields (all optional):
// - title: string
// - description: string
// - status: "todo" | "in-progress" | "done"
// - priority: "low" | "medium" | "high"
// - assignedTo: string (userId)
// - dueDate: string (ISO date)

// Returns:
// { success: true } on success
// { error: string } on failure

// Permissions:
// - Owner: can always update
// - Editor: can update
// - Viewer: cannot update
```

### Delete Task

```typescript
import { deleteTask } from "@/lib/actions/task";

// Delete a task
const result = await deleteTask(taskId);

// Returns:
// { success: true } on success
// { error: string } on failure

// Permissions:
// - Owner: can always delete
// - Editor: can delete
// - Viewer: cannot delete
```

### Add Task Comment

```typescript
import { addTaskComment } from "@/lib/actions/task";

// Add a comment to a task
const result = await addTaskComment(taskId, content);

// content: string (required)

// Returns:
// { success: true } on success
// { error: string } on failure

// Permissions:
// - All project members (owner, editor, viewer) can comment
```

### Delete Task Comment

```typescript
import { deleteTaskComment } from "@/lib/actions/task";

// Delete a comment from a task
const result = await deleteTaskComment(taskId, commentId);

// Returns:
// { success: true } on success
// { error: string } on failure

// Permissions:
// - Comment author can delete own comment
// - Project owner can delete any comment
```

## Permission System

### Project Roles

- **Owner**: Creator of the project
  - Can do everything
  - Can add/remove members
  - Can change member roles
  - Can delete the project

- **Editor**: Collaborator with write access
  - Can create, edit, and delete tasks
  - Can comment on tasks
  - Cannot manage project members
  - Cannot delete the project

- **Viewer**: Read-only access
  - Can view projects and tasks
  - Can comment on tasks
  - Cannot create, edit, or delete tasks

### Authentication

All actions require authentication. They automatically:
1. Check if user is logged in via NextAuth
2. Verify user has access to the project
3. Check user's role and permissions
4. Return appropriate error if unauthorized

## Example Usage

### Creating a Project with a Form

```typescript
"use client";

import { useActionState } from "react";
import { createProject } from "@/lib/actions/project";

export function CreateProjectForm() {
  const [state, action, pending] = useActionState(createProject, undefined);

  return (
    <form action={action}>
      <input name="name" placeholder="Project name" required />
      <textarea name="description" placeholder="Description" />
      <select name="status">
        <option value="active">Active</option>
        <option value="on-hold">On Hold</option>
        <option value="done">Done</option>
      </select>
      <input type="date" name="dueDate" />

      {state?.errors?.name && <p>{state.errors.name[0]}</p>}
      {state?.message && <p>{state.message}</p>}

      <button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
```

### Creating a Task Programmatically

```typescript
"use server";

export async function createTaskAction(projectId: string) {
  const formData = new FormData();
  formData.append("title", "New Task");
  formData.append("description", "Task description");
  formData.append("status", "todo");
  formData.append("priority", "high");

  const result = await createTask(projectId, formData);

  if (result.error) {
    console.error("Failed:", result.error);
  } else {
    console.log("Created task:", result.taskId);
  }
}
```

### Managing Project Members

```typescript
"use server";

export async function inviteCollaborator(projectId: string, email: string) {
  // First, find user by email
  await connectDB();
  const user = await User.findOne({ email });

  if (!user) {
    return { error: "User not found" };
  }

  // Add them as editor
  const result = await addProjectMember(projectId, user._id.toString(), "editor");

  return result;
}
```

## Data Access (Read Operations)

For reading data, use the functions in `src/lib/dal.ts`:

```typescript
import {
  getProjects,
  getProjectDetails,
  getProjectDetailsWithTasks,
  getProjectTaskDetails,
  getUserData
} from "@/lib/dal";

// Get all user's projects
const projects = await getProjects();

// Get specific project
const project = await getProjectDetails(projectId);

// Get project with all tasks
const projectWithTasks = await getProjectDetailsWithTasks(projectId);

// Get specific task with comments
const task = await getProjectTaskDetails(projectId, taskId);

// Get current user data
const user = await getUserData();
```

## Auto-Revalidation

All mutation actions automatically revalidate Next.js cache:

- Creating/updating/deleting projects → revalidates `/dashboard`
- Creating/updating/deleting tasks → revalidates project pages
- All changes trigger UI updates automatically

No manual cache management needed!
