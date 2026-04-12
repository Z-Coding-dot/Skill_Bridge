import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { getAdminTasks, deleteAdminTask } from "@/api/admin.api";
import type { AdminTask } from "@/schemas/admin.schema";

export const AdminTasks = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isPending } = useQuery<AdminTask[]>({
    queryKey: ["admin-tasks"],
    queryFn: getAdminTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-tasks"] }),
  });

  if (isPending) return (
    <div className="flex flex-col gap-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-2card rounded-xl h-16 animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Tasks ({tasks.length})</h1>

      <div className="bg-2card rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-secondary">
            <tr className="text-left text-trinary">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3 hidden sm:table-cell">Category</th>
              <th className="px-4 py-3 hidden md:table-cell">Status</th>
              <th className="px-4 py-3 hidden md:table-cell">Posted By</th>
              <th className="px-4 py-3 hidden lg:table-cell">Applications</th>
              <th className="px-4 py-3 hidden lg:table-cell">Deadline</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-card-bg transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium line-clamp-1">{task.title}</p>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="text-xs px-2 py-1 rounded-lg bg-purple-600 text-white font-semibold">
                    {task.category}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${
                    task.status === "Open" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-trinary text-xs">
                  {task.postedBy.name}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  {task._count.applications}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-trinary text-xs">
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${task.title}"?`)) {
                        deleteMutation.mutate(task.id);
                      }
                    }}
                    disabled={deleteMutation.isPending}
                    className="bg-transparent hover:bg-red-500/20 p-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};