import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return { isAuth: false };
  }

  return {
    isAuth: true,
    userId: session.userId,
    accessToken: session.accessToken,
  };
});

export const getUserData = cache(async () => {
  const session = await verifySession();

  if (!session.isAuth) return null;

  // console.log('Session userId:', session.userId);
  // console.log('Access token:', session.accessToken);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    const data = await res.json();

    // console.log('Response status:', res.status);
    // console.log('Response data:', data);

    if (!res.ok) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch user", error);
    return null;
  }
});

export const getProjects = cache(async () => {
  const session = await verifySession();

  if (!session.isAuth) return null;

  // console.log('Session userId:', session.userId);
  // console.log('Access token:', session.accessToken);

  const user = await getUserData();
  console.log("User", user);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = await res.json();

    // console.log('Response status:', res.status);
    // console.log('Response data:', data);

    if (!res.ok) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch user", error);
    return null;
  }
});
