import { TaskDetailContent } from "@/components/features/task-detail/task-detail-content";
import {
  getProjectDetails,
  getProjectTaskDetails,
  verifySession,
} from "@/lib/dal";

interface Props {
  params: Promise<{ id: number; taskId: number }>;
}

export default async function TaskDetailPage({ params }: Props) {
  const { id, taskId } = await params;

  const session = await verifySession();

  const projectDetails = await getProjectDetails(id);
  console.log("Project details", projectDetails);

  const taskDetails = await getProjectTaskDetails(id, taskId);
  console.log("Task details", taskDetails);

  return <TaskDetailContent project={projectDetails} task={taskDetails} />;
}
