import React from "react";

const NewTaskPage = () => {
  return (
    <div className="flex flex-col max-w-xl">
      <input
        type="text"
        placeholder="Add new task"
        className="input input-bordered input-primary w-full max-w-xs"
      />
      <button className="btn btn-primary btn-sm w-40 mt-5">
        Create new task
      </button>
    </div>
  );
};

export default NewTaskPage;
