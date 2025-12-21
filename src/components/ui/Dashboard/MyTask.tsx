import { Briefcase, Plus } from "lucide-react";
import Section from "@/components/Section/Section";
import { useQuery } from "@tanstack/react-query";
import type { Task } from "@/schemas/task.schema";
import { getMyTasks } from "@/api/tasks.api";
import { useState } from "react";
import { AddTaskModal } from "@/components/Modal/AddTaskModal";



export const MyTask = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, error } = useQuery<Task[]>({
     queryKey: ["my_tasks"],
     queryFn: () => getMyTasks(),
   });

   if(error){
    return <Section><div className="text-center mt-25 text-red-500 text-4xl font-bold">Something went wrong 😟</div></Section>
   }

  if (isLoading) {
    return <Section>Loading...</Section>;
  }

 if ( !data ||  data?.length === 0) {
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
        <button onClick={() => setOpen((prev) => !prev)} className="flex items-center gap-2 2xl:text-base">
          <Plus className="size-5" /> Add Task
        </button>
      </div>
      {open && <AddTaskModal isOpen={open} onClose={() => setOpen((pre) => !pre)} />}
      {data && data.length > 0 && ( 
    <ul className="mt-10 space-y-4">
    {data.map((task) => (
      <li key={task.id} className="bg-2card p-4 rounded-xl">
        <h2 className="font-semibold">{task.title}</h2>
        <p className="text-sm text-stone-400">{task.description}</p>
        <span className="text-xs text-stone-500">
          {task.category} • {task.status}
        </span>
      </li>
    ))}
  </ul>
  )}

      
    </Section>
  );
};
