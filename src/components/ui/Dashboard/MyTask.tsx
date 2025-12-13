import { Briefcase, Plus } from "lucide-react";
import Section from "@/components/Section/Section";
import { useQuery } from "@tanstack/react-query";
import { getMyTasks} from "@/api/tasks.api";
import type { Task } from "@/schemas/task.schema";



export const MyTask = () => {
  const { data = [], isLoading } = useQuery<Task[]>({
    queryKey: ["my-tasks"],
    queryFn: getMyTasks,
  });

  if (isLoading) {
    return <Section>Loading...</Section>;
  }
  

  return (
    <Section>
      <div className="flex items-center justify-between mt-5">
        <h1 className="2xl:text-xl font-semibold">My Posted Tasks</h1>
        <button className="flex items-center gap-2 2xl:text-base">
          <Plus className="size-5" /> Add Task
        </button>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-2card w-full rounded-2xl mt-10 p-12">
          <Briefcase className="size-12 mb-8" />
          <p className="mb-12">You haven't posted any tasks yet</p>
          <button className="flex items-center gap-2 2xl:text-base">
            <Plus className="size-5" /> Post Your First Task
          </button>
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {data.map((task) => (
            <li key={task.id} className="bg-2card p-4 rounded-xl">
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
};
