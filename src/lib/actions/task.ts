"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";

export async function createTask(state: any, formData: FormData) {
  const session = await verifySession();

  if (!session.isAuth) {
    return { message: "Unauthorized" };
  }

  const projectId = formData.get("projectId");
  const title = formData.get("title");
  const description = formData.get("description");
  const status = formData.get("status");
  const priority = formData.get("priority");
  const assignedTo = formData.get("assignedTo");
  const parentTaskId = formData.get("parentTaskId");
  const dueDate = formData.get("dueDate");

  if (!title || typeof title !== "string" || title.trim() === "") {
    return {
      errors: { title: ["Title is required"] },
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description || null,
          status: status || null,
          priority: priority || null,
          assignedTo: assignedTo || null,
          parentTaskId: parentTaskId || null,
          dueDate: dueDate || null,
        }),
      },
    );

    if (!res.ok) {
      const data = await res.json();
      return { message: data.message || "Failed to create project" };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { message: "Something went wrong" };
  }
}
