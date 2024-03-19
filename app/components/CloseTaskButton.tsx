"use client";
import { Task } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const CloseTaskButton = ({ task }: { task: Task }) => {
  const router = useRouter();
  const closeTask = async () => {
    try {
      await axios.patch("/api/tasks/" + task.id, {
        status: "CLOSED",
        task: task.task,
      });
    } catch (error) {
      console.error("Error occured");
    }
  };
  return (
    <button
      className="btn btn-primary btn-outline btn-xs"
      onClick={() => {
        closeTask();
        router.push("/tasks");
        router.refresh();
      }}
    >
      Close task
    </button>
  );
};

export default CloseTaskButton;
