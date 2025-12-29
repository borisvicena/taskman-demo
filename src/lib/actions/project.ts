"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";

export async function createProject(state: any, formData: FormData) {
  const session = await verifySession();

  if (!session.isAuth) {
    return { message: "Unauthorized" };
  }

  const name = formData.get("name");
  const description = formData.get("description");

  if (!name || typeof name !== "string" || name.trim() === "") {
    return {
      errors: { name: ["Name is required"] },
    };
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return {
      errors: { description: ["Description is required"] },
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        name: name.trim(),
        description: description.trim(),
        ownerId: session.userId,
      }),
    });

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
