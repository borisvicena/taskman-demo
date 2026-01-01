import { ProjectDetailContent } from "@/components/features/project-detail/project-detail-content";
import {
  getProjectDetails,
  getProjectDetailsWithTasks,
  verifySession,
} from "@/lib/dal";

interface Props {
  params: Promise<{ id: number }>;
}

export default async function ListDetailPage({ params }: Props) {
  const { id } = await params;

  const session = await verifySession();
  const userId = session.userId;

  const projectDetails = await getProjectDetails(id);
  console.log("Project details", projectDetails);

  const projectTasks = await getProjectDetailsWithTasks(id);
  console.log("Project tasks", projectDetails);

  return (
    <ProjectDetailContent
      project={projectDetails}
      tasks={projectTasks}
      isOwner={userId === projectDetails.ownerId}
    />
  );
}
