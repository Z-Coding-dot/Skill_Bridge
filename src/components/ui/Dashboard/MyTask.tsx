import { Briefcase, Plus } from "lucide-react";
import Section from "@/components/Section/Section";
import { useQuery } from "@tanstack/react-query";
import type { Task } from "@/schemas/task.schema";
import { getMyTasks } from "@/api/tasks.api";



export const MyTask = () => {
  const { data, isLoading } = useQuery<Task[]>({
     queryKey: ["my_task"],
     queryFn: getMyTasks,
   });

  if (isLoading) {
    return <Section>Loading...</Section>;
  }

 if (data?.length === 0) {
    return (
        <div className="2xl:max-w-4xl mx-auto flex flex-col items-center justify-center bg-2card w-full rounded-2xl mt-20 p-12">
          <Briefcase className="size-12 mb-8" />
          <p className="mb-12">You haven't posted any tasks yet</p>
          <button className="flex items-center gap-2 2xl:text-base">
            <Plus className="size-5" /> Post Your First Task
          </button>
        </div>
  )}
  
  return (
    <Section>
      <div className="flex items-center justify-between mt-5">
        <h1 className="2xl:text-xl font-semibold">My Posted Tasks</h1>
        <button className="flex items-center gap-2 2xl:text-base">
          <Plus className="size-5" /> Add Task
        </button>
      </div>
      {data?.map((task) => (
        <ul key={task.id} className="mt-10 space-y-4">
            <div className="bg-2card p-4 rounded-xl">
                <div>
                  <h2>{task.title}</h2>
                  <p>{task.description}</p>
                
                </div>
            </div>
        </ul>

      ))}
      
    </Section>
  );
};
