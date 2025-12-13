import { getApplications } from "@/api/applications.api";
import Section from "@/components/Section/Section"
import type { Application } from "@/schemas/application.schema";
import { useQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react"



export const Applications = () => {
  const { data: app, isLoading } = useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: getApplications,
  });

  if (isLoading) {
    return <Section className="mt-12">Loading...</Section>;
  }

  if (!app || app.length === 0) {
    return <Section className="mt-12">No Applications</Section>;
  }

  return (
    <Section className="mt-5">
      <div className="space-y-6">
        {app.map((application) => (
          <div
            key={application.id}
            className="flex flex-col items-start bg-2card w-full rounded-xl p-6"
          >
            <h3 className="mb-3">{application.taskTitle}</h3>

            <span className="flex items-center text-xs gap-2 bg-accent rounded-2xl px-2 py-1 mb-5 text-stone-100">
              <Clock className="h-4 w-4" />
              {application.status}
            </span>

            <div className="bg-card-bg flex flex-col items-start w-full p-4 rounded-xl">
              <p className="text-stone-400">Your Pitch:</p>
              <p className="text-stone-200">{application.pitch}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
