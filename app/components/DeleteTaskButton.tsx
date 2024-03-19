"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteTaskButton = ({ taskId }: { taskId: number }) => {
  const router = useRouter();
  const deleteTask = async () => {
    try {
      await axios.delete("/api/tasks/" + taskId);
    } catch (error) {
      console.error("Error occured");
    }
  };

  return (
    <button
      className="btn btn-error btn-outline btn-xs"
      onClick={() => {
        deleteTask();
        router.push("/tasks");
        router.refresh();
      }}
    >
      Delete
    </button>
  );
};

export default DeleteTaskButton;
