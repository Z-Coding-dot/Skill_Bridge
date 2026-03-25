import { AlertTriangle, CircleCheck, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Section from "@/components/Section/Section";
import { getNotifications } from "@/api/notifications.api";
import type { Notification } from "@/schemas/notification.schema";
import clsx from "clsx";


export const Notifications = () => {
  const { data, isPending, isError} = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });

  if (isPending) {
    return <Section>Loading...</Section>;
  }
  if(isError) return <Section className="text-center mt-25 text-red-600">Something went wrong</Section>

  if (data?.length === 0) {
    return (
      <Section>
        <p className="text-stone-400 mt-5">No notifications.</p>
      </Section>
    );
  }


const notificationConfig = {
  success: { icon: CircleCheck, iconColor: "text-green-500", textBG: "bg-green-500" },
  warning: { icon: AlertTriangle, iconColor: "text-yellow-500", textBG: "bg-amber-300" },
  error: { icon: AlertTriangle, iconColor: "text-red-600", textBG: "bg-error" },
  info: { icon: Info, iconColor: "text-blue-500", textBG: "bg-trinary",},
};

  
  return (
    <Section>
      <div className="flex flex-col gap-4 bg-2card w-full rounded-xl p-2 sm:p-4">
        {data?.map((n) => {
          const config = notificationConfig[n.type];
          const Icon = config.icon;
      return (
      <div key={n.id}
      className={clsx("flex gap-4 rounded-xl p-2 sm:p-4 bg-card-bg")}>
      <Icon className={clsx("mt-2", config.iconColor)} />
      <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-2 sm:gap-4">
        <div className="mr-5">
        <h1 className="text-sm sm:text-base">{n.title}</h1>
        <p className="text-wrap text-xs sm:text-sm mt-1 sm:mt-2 text-stone-400">{n.message}</p>
        </div>
        <div className="flex flex-col justify-between h-full max-sm:items-end">
        <p className={clsx("hidden sm:flex text-xs px-2 py-1 rounded-lg text-center  mb-3 text-white justify-center capitalize", config.textBG)}>{n.type}</p>
        <span className="text-xs text-trinary font-semibold truncate mt-4 max-sm:-mr-25">{n.createdAt}</span>
        </div>
      </div>
        </div>)
         })}
      </div>
    </Section>
  );
};
