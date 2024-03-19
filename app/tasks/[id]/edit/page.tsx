import TaskForm from "@/app/components/TaskForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditTaskPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();

  return (
    <div className=" max-w-xl">
      <TaskForm task={task} />
    </div>
  );
};

export default EditTaskPage;
