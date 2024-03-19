import CloseTaskButton from "@/app/components/CloseTaskButton";
import DeleteTaskButton from "@/app/components/DeleteTaskButton";
import EditTaskButton from "@/app/components/EditTaskButton";
import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

const TaskDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });

  if (!task) notFound();

  return (
    <div className="card w-96 bg-gray-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title">{task?.task}</h1>
        <StatusBadge status={task?.status} />
        <p className="text-sm mb-5">{task?.createdAt.toLocaleString()}</p>
        <div className="card-actions justify-end">
          {task?.status === "OPEN" && <CloseTaskButton task={task} />}
          <EditTaskButton taskId={parseInt(id)} />
          <DeleteTaskButton taskId={parseInt(id)} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
