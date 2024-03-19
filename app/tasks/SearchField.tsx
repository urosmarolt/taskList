"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  searchParams: { searchQuery: string };
}

interface FormProps {
  queryString: string;
}

const SearchField = () => {
  const { register, handleSubmit } = useForm<FormProps>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="mb-10">
      {error && (
        <div role="alert" className="alert alert-error mb-5 bg-red-100">
          <span>{error}</span>
        </div>
      )}
      <form
        className="flex flex-col"
        onSubmit={
          handleSubmit((data) => {
            router.push(`/tasks?searchQuery=${data.queryString}`);
          })

          /* handleSubmit(async (data) => {
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
        }) */
        }
      >
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Search for task"
            className="input input-bordered input-primary max-w-xl h-8"
            {...register("queryString")}
          />
          <button className="btn btn-primary btn-sm w-40 ml-3" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchField;
