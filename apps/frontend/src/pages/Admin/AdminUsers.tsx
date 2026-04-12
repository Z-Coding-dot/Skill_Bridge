import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, User } from "lucide-react";
import { getAdminUsers, deleteAdminUser } from "@/api/admin.api";
import type { AdminUser } from "@/schemas/admin.schema";

export const AdminUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isPending } = useQuery<AdminUser[]>({
    queryKey: ["admin-users"],
    queryFn: getAdminUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
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
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Users ({users.length})</h1>
      </div>

      <div className="bg-2card rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-secondary">
            <tr className="text-left text-trinary">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3 hidden sm:table-cell">Role</th>
              <th className="px-4 py-3 hidden md:table-cell">Tasks</th>
              <th className="px-4 py-3 hidden md:table-cell">Applications</th>
              <th className="px-4 py-3 hidden lg:table-cell">Joined</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-card-bg transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="size-8 rounded-full bg-active flex items-center justify-center shrink-0">
                      <User className="size-4 text-white" />
                    </span>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-trinary">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${
                    user.role === "admin" ? "bg-purple-600 text-white" : "bg-card-bg text-trinary"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">{user._count.postedTasks}</td>
                <td className="px-4 py-3 hidden md:table-cell">{user._count.applications}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-trinary text-xs">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      if (confirm(`Delete ${user.name}?`)) {
                        deleteMutation.mutate(user.id);
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