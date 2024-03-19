import prisma from "@/prisma/client";
import Link from "next/link";
import StatusBadge from "../components/StatusBadge";
import DeleteTaskButton from "../components/DeleteTaskButton";
import SearchField from "./SearchField";
import { Task } from "@prisma/client";

interface Props {
  searchParams: { searchQuery: string; orderBy: keyof Task };
}

const TasksPage = async ({ searchParams: { searchQuery, orderBy } }: Props) => {
  const columns: { label: string; value: keyof Task }[] = [
    { label: "ID", value: "id" },
    { label: "Task", value: "task" },
    { label: "Created At", value: "createdAt" },
    { label: "Status", value: "status" },
  ];

  const search = searchQuery ? searchQuery : undefined;
  const order = columns.map((column) => column.value).includes(orderBy)
    ? { [orderBy]: "asc" }
    : undefined;

  const tasks = await prisma.task.findMany({
    where: { task: { contains: search } },
    orderBy: order,
  });

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
                    <Link
                      href={{
                        query: { searchQuery, orderBy: column.value },
                      }}
                      className="text-black hover:underline font-semi-bold"
                    >
                      {column.label}
                    </Link>
                    {column.value === orderBy && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                        />
                      </svg>
                    )}
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
