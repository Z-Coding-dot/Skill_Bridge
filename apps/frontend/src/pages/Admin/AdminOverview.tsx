import { useQuery } from "@tanstack/react-query";
import { Users, Briefcase, FileText, MessageSquare } from "lucide-react";
import { getAdminStats } from "@/api/admin.api";
import type { AdminStats } from "@/schemas/admin.schema";

const statCards = (stats: AdminStats) => [
  { label: "Total Users",        value: stats.totalUsers,        icon: Users,         bg: "bg-active"     },
  { label: "Total Tasks",        value: stats.totalTasks,        icon: Briefcase,     bg: "bg-login-bg"   },
  { label: "Total Applications", value: stats.totalApplications, icon: FileText,      bg: "bg-success"    },
  { label: "Total Feedbacks",    value: stats.totalFeedbacks,    icon: MessageSquare, bg: "bg-purple-600" },
];

export const AdminOverview = () => {
  const { data: stats, isPending } = useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
  });

  if (isPending) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-2card rounded-xl p-6 animate-pulse h-28" />
      ))}
    </div>
  );

  if (!stats) return null;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards(stats).map((card) => (
          <div key={card.label} className={`${card.bg} rounded-xl px-6 py-5 flex items-center justify-between`}>
            <div>
              <p className="text-sm text-white/80">{card.label}</p>
              <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
            </div>
            <card.icon className="size-8 text-white/70" />
          </div>
        ))}
      </div>
    </div>
  );
};