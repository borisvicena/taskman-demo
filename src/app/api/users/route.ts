import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getUsers } from "@/controllers/userController";

export async function GET() {
  await connectDB();
  const users = await getUsers();
  return NextResponse.json(users);
}