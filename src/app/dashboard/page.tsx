import { Metadata } from "next";
import { getProjects } from "@/lib/dal";
import { HomeContent } from "@/components/features/dashboard/home-content";

export const metadata: Metadata = {
  title: "TaskMan",
  description: "TaskMan Application",
};

export default async function HomePage() {
  const projects = await getProjects();
  console.log("Projects", projects);

  return (
    <>
      <HomeContent projects={projects} />
    </>
  );
}
