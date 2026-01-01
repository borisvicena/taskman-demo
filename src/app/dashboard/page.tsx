import { Metadata } from "next";
import { getProjectDetailsWithTasks, getProjects } from "@/lib/dal";
import { DashboardContent } from "@/components/features/dashboard/dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | TaskMan",
  description:
    "Manage all your projects, tasks, and subtasks in one organized space",
};

export default async function Dashboard() {
  // Get all user projects
  const projects = await getProjects();

  return <DashboardContent projects={projects} />;
}
