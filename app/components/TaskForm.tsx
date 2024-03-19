"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";

const TaskForm = ({ task }: { task?: Task }) => {
  const { register, handleSubmit } = useForm<Task>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div>
      {error && (
        <div role="alert" className="alert alert-error mb-5 bg-red-100">
          <span>{error}</span>
        </div>
      )}
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(async (data) => {
          try {
            if (task)
              await axios.patch("/api/tasks/" + task.id, {
                task: data.task,
                status: task.status,
              });
            else await axios.post("/api/tasks", data);
            router.push("/tasks");
            router.refresh();
          } catch (error) {
            setError("Error occured");
          }
        })}
      >
        <input
          type="text"
          defaultValue={task?.task}
          placeholder="New task"
          className="input input-bordered input-primary w-full"
          {...register("task")}
        />
        <button className="btn btn-primary btn-sm w-40 mt-5" type="submit">
          {task ? "Update task" : "Create task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
