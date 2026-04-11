import { Briefcase, Pencil, Plus } from "lucide-react";
import Section from "@/components/Section/Section";
import { useQuery } from "@tanstack/react-query";
import type { Task } from "@/schemas/task.schema";
import { getMyTasks } from "@/api/tasks.api";
import { useState } from "react";
import { AddTaskModal } from "@/components/Modal/AddTaskModal";
import { EditTaskModal } from "@/components/Modal/EditTaskModal";
import { MyTaskSkeleton } from "@/components/Loaders/MyTaskSkeleton";

export const MyTask = () => {
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { data, isPending, error } = useQuery<Task[]>({
    queryKey: ["my-tasks"],
    queryFn: () => getMyTasks(),
  });

  if (error) return (
    <Section><div className="text-center mt-25 text-red-500 text-4xl font-bold">Something went wrong 😟</div></Section>
  );

  if (isPending) return <MyTaskSkeleton />;

  if (!data || data.length === 0) return (
    <div className="2xl:max-w-4xl mx-auto flex flex-col items-center justify-center sm:bg-2card w-full rounded-2xl mt-20 p-8 sm:p-12">
      <Briefcase className="size-12 mb-8" />
      <p className="mb-12">You haven't posted any tasks yet</p>
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 2xl:text-base">
        <Plus className="size-5" /> Post Your First Task
      </button>
      {open && <AddTaskModal isOpen={open} onClose={() => setOpen(false)} />}
    </div>
  );

  return (
    <Section>
      <div className="flex items-center justify-between">
        <h1 className="2xl:text-xl font-semibold">My Posted Tasks</h1>
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 2xl:text-base">
          <Plus className="size-5" /> Add Task
        </button>
      </div>

      {open && <AddTaskModal isOpen={open} onClose={() => setOpen(false)} />}
      {editingTask && (
        <EditTaskModal
          isOpen={Boolean(editingTask)}
          onClose={() => setEditingTask(null)}
          task={editingTask}
        />
      )}

      <ul className="mt-10 space-y-4 pr-2">
        {data.map((task) => (
          <div key={task.id} className="bg-2card rounded-xl flex flex-col-reverse sm:flex-row items-center sm:justify-between">
            <div className="p-2 sm:p-5 w-full">
            <div className="flex sm:justify-between max-sm:flex-col-reverse sm:items-center w-full gap-4 text-center sm:text-left">
              <div>
              <h2 className="font-semibold text-start text-sm sm:text-base 2xl:text-2xl 3xl:text-3xl sm:mb-4"> 
                <span>Title: </span>{task.title}</h2>
              </div>
              <div className="flex items-center justify-end gap-4">
              <span className={` max-sm:w-20 text-xs sm:text-sm font-semibold ${task.status === "Open" ? "bg-green-500" : "bg-red-500"} text-white rounded-lg py-0.5 sm:py-1 px-2 sm:px-3`}>
                {task.status}
              </span>
              <span className=" max-sm:w-20 text-xs sm:text-sm font-semibold text-white bg-purple-500 rounded-lg py-0.5 sm:py-1 px-1 sm:px-2">
                {task.category}
              </span>
              <button
                onClick={() => setEditingTask(task)}
                className="max-sm:w-20  bg-yellow-500 hover:bg-btnHover sm:py-1.5 sm:px-3 px-2 py-0.5 rounded-lg " >
                <Pencil className="size-4 text-white text-center hidden sm:block" /> <span className="sm:hidden text-white text-xs font-semibold">Edit</span>
              </button>
              </div>
            </div>
              <p className="text-xs sm:text-sm 2xl:text-base text-stone-300 whitespace-pre-wrap line-clamp-4">
                <span>Descriptions: </span> <br/>{task.description}
              </p>
            </div>
           
          </div>
        ))}
      </ul>
    </Section>
  );
};
