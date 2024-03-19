"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormProps {
  queryString: string;
}

const SearchField = () => {
  const { register, handleSubmit } = useForm<FormProps>();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="mb-10">
      <form
        className="flex flex-col"
        onSubmit={handleSubmit((data) => {
          router.push(`/tasks?searchQuery=${data.queryString}`);
        })}
      >
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Search for tasks"
            defaultValue={searchParams.get("searchQuery")!}
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
