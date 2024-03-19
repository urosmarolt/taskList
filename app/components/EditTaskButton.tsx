import Link from "next/link";
import React from "react";

const EditTaskButton = ({ taskId }: { taskId: number }) => {
  return (
    <button className="btn btn-primary btn-outline btn-xs mr-3">
      <Link href={`/tasks/${taskId}/edit`}>Edit task</Link>
    </button>
  );
};

export default EditTaskButton;
