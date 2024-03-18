import prisma from "@/prisma/client";
import Link from "next/link";
import StatusBadge from "../components/StatusBadge";

const TasksPage = async ({
  searchParams: { sortOrder },
}: {
  searchParams: { sortOrder: string };
}) => {
  const tasks = await prisma.task.findMany();

  return (
    <div>
      <h1 className="mb-5">Tasks</h1>
      <div className="overflow-x-auto max-w-2xl">
        <table className="table table-xs">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Created At</th>
              <th>Status</th>
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
                      className="link link-primary"
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
                    <button className="btn btn-error btn-outline btn-xs">
                      Delete
                    </button>
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

export default TasksPage;
