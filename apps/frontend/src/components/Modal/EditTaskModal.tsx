import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task, TaskCategory } from "@/schemas/task.schema";
import { updateTask } from "@/api/tasks.api";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
};

const CATEGORY_OPTIONS = [
  "Gig", "Internship", "Tutoring", "Project", "Freelance", "Job", "Other",
] as const;

export const EditTaskModal = ({ isOpen, onClose, task }: Props) => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    category: task.category,
    deadline: task.deadline.split("T")[0],
    status: task.status,
  });
  const [errors, setErrors] = useState<{ title?: string; description?: string; deadline?: string }>({});

  useEffect(() => {
    if (isOpen) {
      setForm({
        title: task.title,
        description: task.description,
        category: task.category,
        deadline: task.deadline.split("T")[0],
        status: task.status,
      });
      setErrors({});
    }
  }, [isOpen, task]);

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Task>) => updateTask(task.id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
      onClose();
    },
  });

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!form.title.trim()) nextErrors.title = "Title is required.";
    else if (form.title.trim().length < 3) nextErrors.title = "Title must be at least 3 characters.";
    if (!form.description.trim()) nextErrors.description = "Description is required.";
    else if (form.description.trim().length < 10) nextErrors.description = "Description must be at least 10 characters.";
    if (!form.deadline) nextErrors.deadline = "Deadline is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    updateMutation.mutate({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category as TaskCategory,
      deadline: form.deadline,
      status: form.status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex sm:items-center sm:justify-center z-50">
      <div className="bg-2card w-full max-w-3xl sm:rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Task</h2>
          <button className="bg-transparent hover:bg-btnHover p-1" onClick={onClose}>
            <X className="size-5 text-white" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <input
              className="input w-full text-xs sm:text-base"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && <p className="mt-1 text-xs text-error">{errors.title}</p>}
          </div>

          <div>
            <textarea
              className="input sm:min-h-[350px] w-full h-[200px] text-xs sm:text-base"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            {errors.description && <p className="mt-1 text-xs text-error">{errors.description}</p>}
          </div>

          <div className="flex gap-3">
            <select
              className="input flex-1 text-sm sm:text-base"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as TaskCategory })}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              className="input flex-1 text-sm sm:text-base"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Task["status"] })}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              className="input w-full text-sm sm:text-base"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
            {errors.deadline && <p className="mt-1 text-xs text-error">{errors.deadline}</p>}
          </div>
        </div>

        {updateMutation.isError && (
          <p className="mt-3 text-sm text-error">Failed to update task. Please try again.</p>
        )}

        <div className="flex justify-between gap-3 mt-6">
          <button onClick={onClose} className="flex-1">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={updateMutation.isPending}
            className="w-3/4"
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};