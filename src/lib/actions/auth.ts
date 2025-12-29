"use server";

import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
} from "@/lib/definitions";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export async function signupWithGoogle() {
  const googleAuthUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!googleAuthUrl) {
    // Handle missing env variable
    return {
      message: "Configuration error. Please try again later.",
    };
  }

  redirect(`${googleAuthUrl}/api/auth/google`);
}

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
      },
    );

    // Parse the response body
    const data = await res.json();

    // Handle non-2xx responses
    if (!res.ok) {
      return {
        message: data.message || "Registration failed",
        errors: data.errors || {},
      };
    }

    // Now data contains the user object
    await createSession(data.id, data.token);
  } catch (error) {
    console.error("Signup error:", error);
    return {
      message: "Something went wrong. Please try again.",
    };
  }

  redirect("/");
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        message: data.message || "Invalid email or password",
      };
    }

    await createSession(data.id, data.token);
  } catch (error) {
    console.error("Login error:", error);
    return {
      message: "Something went wrong. Please try again.",
    };
  }

  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
