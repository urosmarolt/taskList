import CloseTaskButton from "@/app/components/CloseTaskButton";
import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

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
          {task?.status === "OPEN" && <CloseTaskButton taskId={parseInt(id)} />}
          <button className="btn btn-error btn-outline btn-xs">Delete</button>
        </div>
      </div>
    </div>
    /* <div>
      <h1 className="font-extrabold">{task?.task}</h1>
      <StatusBadge status={task?.status} />
      <p className="text-sm mb-5">{task?.createdAt.toLocaleString()}</p>
      {task?.status === "OPEN" && (
        <button className="btn btn-primary btn-outline btn-xs  mr-3">
          Close task
        </button>
      )}
      <button className="btn btn-error btn-outline btn-xs">Delete</button>
    </div> */
  );
};

export default TaskDetailPage;
