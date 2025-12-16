import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TaskSchema, type Task, type TaskCategory } from "@/schemas/task.schema";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CATEGORY_OPTIONS = [
  "Gig",
  "Internship",
  "Tutoring",
  "Project",
  "Freelance",
] as const;

export const AddTaskModal = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();

 const [form, setForm] = useState<{
  title: string;
  description: string;
  category: TaskCategory;
  deadline: string;
}>({
  title: "",
  description: "",
  category: "Project",
  deadline: "",
});


  if (!isOpen) return null;

  const handleSubmit = () => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      deadline: form.deadline,
      status: "Open",
      createdAt: new Date().toISOString(),
      postedBy: {
        id: "user-1",
        name: "Parsa Karimi",
      },
    };

    try {
      TaskSchema.parse(newTask);

      queryClient.setQueryData<Task[]>(["my_task"], (old = []) => [
        newTask,
        ...old,
      ]);

      onClose();
      setForm({
        title: "",
        description: "",
        category: "Project",
        deadline: "",
      });
    } catch (error) {
      console.error("Validation failed:", error);
      alert("Please fill all fields correctly");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-2card w-full max-w-xl rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Add Task</h2>

        <div className="flex flex-col gap-3">
          <input
            className="input"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            className="input min-h-[100px]"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="flex gap-3">
            <select
              className="input flex-1"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as TaskCategory})
              } >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}> {c} </option> ))}
            </select>

            <input type="date"
              className="input flex-1"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}/>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary px-4 py-2 rounded text-white">Save Task
          </button>
        </div>
      </div>
    </div>
  );
};
