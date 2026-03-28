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
     queryKey: ["tasks"],
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
          <button onClick={() => setOpen((prev) => !prev)} className="flex items-center gap-2 2xl:text-base">
            <Plus className="size-5" /> Post Your First Task  
          </button>
          {open && <AddTaskModal isOpen={open} onClose={() => setOpen((pre) => !pre)} />}
        </div>
  )}
  
  return (
    <Section>
      <div className="flex items-center justify-between">
        <h1 className="2xl:text-xl font-semibold">My Posted Tasks</h1>
        <button onClick={() => setOpen((prev) => !prev)} className="flex items-center gap-2 2xl:text-base">
          <Plus className="size-5" /> Add Task
        </button>
      </div>
      {open && <AddTaskModal isOpen={open} onClose={() => setOpen((pre) => !pre)} />}
      {data && data.length > 0 && ( 
    <ul className="mt-10 space-y-4">
    {data.map((task) => (
      <div key={task.id} className="bg-2card rounded-xl flex flex-col-reverse sm:flex-row items-center sm:justify-between">
        <div className="p-2 sm:p-5">
        <h2 className="font-semibold text-sm sm:text-base 2xl:text-2xl 3xl:text-3xl mb-4">{task.title}</h2>
        <p className="text-xs sm:text-sm 2xl:text-base text-stone-300 line-clamp-2"><span>Descriptions: </span>{task.description}</p>
        </div>
        <div className="flex justify-between items-center w-full sm:w-auto gap-4 sm:flex-col p-2 sm:p-5">
        <span className={`text-xs sm:text-sm font-semibold ${task.status === "Open" ? "bg-green-500" : "bg-red-500"} text-white rounded-lg py-0.5 sm:py-1 px-2 sm:px-3`}>{task.status} </span>
        <span className="text-xs sm:text-sm font-semibold text-white bg-purple-500 rounded-lg py-0.5 sm:py-1 px-1 sm:px-2">{task.category} </span>

        </div>
      </div>
    ))}
  </ul>
  )}

      
    </Section>
  );
};
