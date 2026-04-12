import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Star } from "lucide-react";
import { getAdminFeedbacks, deleteAdminFeedback } from "@/api/admin.api";
import type { AdminFeedback } from "@/schemas/admin.schema";

export const AdminFeedbacks = () => {
  const queryClient = useQueryClient();

  const { data: feedbacks = [], isPending } = useQuery<AdminFeedback[]>({
    queryKey: ["admin-feedbacks"],
    queryFn: getAdminFeedbacks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminFeedback,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-feedbacks"] }),
  });

  if (isPending) return (
    <div className="flex flex-col gap-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-2card rounded-xl h-24 animate-pulse" />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Feedbacks ({feedbacks.length})</h1>

      <div className="flex flex-col gap-4">
        {feedbacks.map((fb) => (
          <div key={fb.id} className="bg-2card rounded-xl p-4 sm:p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-sm flex items-center gap-5 ">Subject: <p className="text-white">{fb.subject}</p></span>
                <span className="text-xs text-trinary mt-0.5 flex items-center gap-5">
                 Name: <p className="text-white">{fb.user.name}</p>  
                </span>
                <span className="flex items-center gap-5">Email: <p className="text-white">{fb.user.email}</p></span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3.5 ${i < fb.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    if (confirm("Delete this feedback?")) {
                      deleteMutation.mutate(fb.id);
                    }
                  }}
                  disabled={deleteMutation.isPending}
                  className="bg-transparent hover:bg-red-500/20 p-1.5 rounded-lg transition-colors"
                >
                  <Trash2 className="size-4 text-red-500" />
                </button>
              </div>
            </div>
            <p className="text-sm text-stone-300">{fb.message}</p>
            <p className="text-xs text-trinary">{new Date(fb.createdAt).toLocaleDateString()}</p>
          </div>
        ))}

        {feedbacks.length === 0 && (
          <p className="text-center text-trinary text-sm mt-10">No feedbacks yet.</p>
        )}
      </div>
    </div>
  );
};