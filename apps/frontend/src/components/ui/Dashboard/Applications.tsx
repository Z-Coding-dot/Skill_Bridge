import { getApplications } from "@/api/applications.api";
import { ApplicationsSkeleton } from "@/components/Loaders/ApplilcationSkeleton";
import Section from "@/components/Section/Section"
import type { Application } from "@/schemas/application.schema";
import { useQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react"



export const Applications = () => {
  const { data: app, isPending } = useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: () => getApplications(),
  });

  if (isPending) {
    return <ApplicationsSkeleton />;
  }

  if (!app || app.length === 0) {
    return <Section className="text-stone-300 text-sm sm:text-lg mt-12 text-center">You have not applied for any tasks.</Section>;
  }

  const STYLE_STATUS = {
    pending: "bg-yellow-500",
    accepted: "bg-green-500",
    rejected: "bg-red-500",
  };

  return (
    <Section>
      <div className="space-y-6">
        {app.map((application) => (
          <div
            key={application.id}
            className="flex flex-col items-start bg-2card w-full rounded-xl p-2 sm:p-5">
            <div className="flex items-center justify-between mb-3 sm:mb-6 w-full">
            <h3 className="text-sm sm:text-base font-semibold 2xl:text-xl">{application.taskTitle}</h3>
            <span className={`${STYLE_STATUS[application.status] ?? "bg-gray-500"} flex items-center text-xs sm:text-sm capitalize font-semibold gap-2 rounded-lg px-2 py-1 text-stone-100`}>
              {application.status === "pending" && <Clock className="h-4 w-4" /> }
              {application.status}
            </span>

              </div>

            <div className="bg-card-bg flex flex-col items-start w-full p-2 sm:p-4 rounded-xl">
              <p className="text-stone-400 text-sm mb-3">Your Pitch:</p>
              <p className="text-stone-200 text-xs sm:text-sm">{application.pitch}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
