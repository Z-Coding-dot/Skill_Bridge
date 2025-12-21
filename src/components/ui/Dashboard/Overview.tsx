import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section/Section";
import { Bell, Briefcase, CheckCheck, CircleCheck, File} from "lucide-react";
import type { DashboardOverview } from "@/schemas/dashboard.schema";
import { getDashboardOverview } from "@/api/dashboard.api";

export const Overview = () => {
  const { data, isLoading } = useQuery<DashboardOverview>({
    queryKey: ["dashboard-overview"],
    queryFn: () => getDashboardOverview(),
  });

  if (isLoading) return <Section>Loading...</Section>;
 

  return (
    <Section>

      <div className="sm:mt-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 2x:px-4 2x:py-4 rounded-2xl max-sm:w-full">
              <div className="flex items-center justify-between bg-active px-6 py-4 rounded-2xl w-full mb-3">
                <div>
                <h2 className="text-sm sm:text-base 2xl:text-lg">Tasks Posted</h2>
                <h2 className="text-white text-base sm:text-lg 2xl:text-3xl font-semibold mt-1 sm:mt-3">{data?.stats.tasksPosted}</h2>
                </div>
              <Briefcase className="2xl:size-8"/>
              </div>
              <div className="flex items-center justify-between bg-login-bg px-6 py-4 rounded-2xl w-full mb-3">
                <div>
                <h2 className="text-sm sm:text-base 2xl:text-lg">Applications Sent</h2>
                <h2 className="text-white text-base sm:text-lg 2xl:text-3xl font-semibold mt-1 sm:mt-3">{data?.stats.applicationsSent}</h2>
                </div>
              <File className="2xl:size-8"/>
              </div>
              <div className="flex items-center justify-between bg-success px-6 py-4 rounded-2xl w-full mb-3">
                <div>
                <h2 className="text-sm sm:text-base 2xl:text-lg">Accepted</h2>
                <h2 className="text-white text-base sm:text-lg 2xl:text-3xl font-semibold mt-1 sm:mt-3">{data?.stats.accepted}</h2>
                </div>
              <CheckCheck className="2xl:size-8 "/>
              </div>
          </div>
      </div>

      <div className="rounded-2xl sm:p-5 sm:mt-10">
        <h2 className="text-bae sm:text-xl mb-4">Recent Activity</h2>
        {data?.recentActivity.length === 0 ? (
          <p className="text-stone-400">No recent activity.</p>
        ) : (
          data?.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center bg-2card rounded-2xl sm:px-6 px-3 py-2 sm:py-4 gap-4 mb-3">
              {activity.type === "success" ? <CircleCheck className="text-green-500" /> : <Bell className="text-yellow-500" />}
              <div>
                <h3 className="text-xs sm:text-sm">{activity.text}</h3>
                <span className="text-xs">{activity.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </Section>
  );
};
