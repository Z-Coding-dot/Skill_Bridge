import { Bell, CircleCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section/Section";
import { getNotifications, type Notification } from "@/api/notifications.api";


export const Notifications = () => {
  const { data = [], isLoading } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  if (isLoading) {
    return <Section>Loading...</Section>;
  }

  if (data.length === 0) {
    return (
      <Section>
        <p className="text-stone-400 mt-5">No notifications.</p>
      </Section>
    );
  }

  return (
    <Section>
      <div className="flex flex-col gap-4 bg-2card w-full rounded-xl p-6 mt-5">
        {data.map((n) => (
          <div
            key={n.id}
            className="flex gap-4 bg-card-bg rounded-xl p-4"
          >
            {n.type === "success" ? (
              <CircleCheck className="mt-1 text-green-500" />
            ) : (
              <Bell className="mt-1 text-blue-500" />
            )}

            <div className="flex flex-col items-start">
              <h1>{n.title}</h1>
              <p>{n.message}</p>
              <span className="text-xs">{n.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
