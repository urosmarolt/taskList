import React from "react";

const TaskDetailPage = ({ params: { id } }: { params: { id: string } }) => {
  return <div>TaskDetailPage {id}</div>;
};

export default TaskDetailPage;
