const TasksPage = ({
  searchParams: { sortOrder },
}: {
  searchParams: { sortOrder: string };
}) => {
  return <div>TasksPage {sortOrder}</div>;
};

export default TasksPage;
