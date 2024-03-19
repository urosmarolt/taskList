import prisma from "@/prisma/client";
import Link from "next/link";
import StatusBadge from "../components/StatusBadge";
import DeleteTaskButton from "../components/DeleteTaskButton";
import SearchField from "./SearchField";
import { Task } from "@prisma/client";

interface Props {
  searchParams: { searchQuery: string };
}

const TasksPage = async ({ searchParams: { searchQuery } }: Props) => {
  const columns: { label: string; value: keyof Task }[] = [
    { label: "ID", value: "id" },
    { label: "Task", value: "task" },
    { label: "Created At", value: "createdAt" },
    { label: "Status", value: "status" },
  ];

  let tasks = null;
  if (searchQuery)
    tasks = await prisma.task.findMany({
      where: { task: { contains: searchQuery } },
    });
  else tasks = await prisma.task.findMany();

  return (
    <div>
      <h1 className="mb-5">
        <Link href="/tasks">Tasks</Link>
      </h1>
      <SearchField />
      <div className="overflow-x-auto max-w-2xl">
        <table className="table table-xs">
          {/* head */}
          <thead>
            <tr>
              {columns.map((column) => {
                return (
                  <th key={column.label}>
                    <Link href="">{column.label}</Link>
                  </th>
                );
              })}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => {
              return (
                <tr key={index}>
                  <td>{task.id}</td>
                  <td>
                    <Link
                      className="text-violet-600 hover:underline font-semibold"
                      href={`/tasks/${task.id}`}
                    >
                      {task.task}
                    </Link>
                  </td>
                  <td>{task.createdAt.toLocaleString()}</td>
                  <td>
                    <StatusBadge status={task.status} />
                  </td>
                  <td>
                    <DeleteTaskButton taskId={task.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary btn-sm mt-5">
        <Link href="/tasks/new">New task</Link>
      </button>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default TasksPage;
