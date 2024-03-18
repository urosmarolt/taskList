"use client";
import axios from "axios";

const CloseTaskButton = ({ taskId }: { taskId: number }) => {
  const closeTask = () => {
    axios.patch("/api/tasks/" + taskId, { status: "CLOSED" });
  };
  return (
    <button
      className="btn btn-primary btn-outline btn-xs  mr-3"
      onClick={() => closeTask()}
    >
      Close task
    </button>
  );
};

export default CloseTaskButton;
