import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, CircleCheck, Info } from "lucide-react";
import clsx from "clsx";
import Section from "@/components/Section/Section";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/api/notifications.api";
import type { Notification } from "@/schemas/notification.schema";
import { NotificationsSkeleton } from "@/components/Loaders/NotificationSkeleton";

const notificationConfig = {
  success: { icon: CircleCheck, iconColor: "text-green-500", textBG: "bg-green-500" },
  warning: { icon: AlertTriangle, iconColor: "text-yellow-500", textBG: "bg-amber-300" },
  error: { icon: AlertTriangle, iconColor: "text-red-600", textBG: "bg-error" },
  info: { icon: Info, iconColor: "text-blue-500", textBG: "bg-trinary" },
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

export const Notifications = () => {
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  const markOneMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const markAllMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  if (isPending) {
    return <NotificationsSkeleton />;
  }

  if (isError) {
    return <Section className="text-center mt-25 text-red-600">Something went wrong</Section>;
  }

  if (data?.length === 0) {
    return (
      <Section>
        <p className="text-stone-400 mt-5">No notifications.</p>
      </Section>
    );
  }

  const unreadCount = data?.filter((notification) => !notification.readAt).length ?? 0;

  return (
    <Section>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Notifications</h2>
          <p className="text-sm text-stone-400">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => markAllMutation.mutate()}
          disabled={unreadCount === 0 || markAllMutation.isPending}
          className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Mark all as read
        </button>
      </div>

      <div className="flex flex-col gap-4 bg-2card w-full rounded-xl p-2 sm:p-4">
        {data?.map((notification) => {
          const config = notificationConfig[notification.type];
          const Icon = config.icon;
          const isUnread = !notification.readAt;

          return (
            <button
              key={notification.id}
              type="button"
              onClick={() => {
                if (isUnread) {
                  markOneMutation.mutate(notification.id);
                }
              }}
              className={clsx(
                "flex w-full gap-4 rounded-xl p-2 sm:p-4 text-left transition-colors",
                isUnread ? "bg-card-bg ring-1 ring-[var(--primary)]/40" : "bg-card-bg/70",
              )}
            >
              <Icon className={clsx("mt-2 shrink-0", config.iconColor)} />

              <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full gap-2 sm:gap-4">
                <div className="mr-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base">{notification.title}</h3>
                    {isUnread ? (
                      <span className="size-2 rounded-full bg-[var(--primary)]" />
                    ) : null}
                  </div>
                  <p className="text-wrap text-xs sm:text-sm mt-1 sm:mt-2 text-stone-400">
                    {notification.message}
                  </p>
                </div>

                <div className="flex flex-col justify-between h-full max-sm:items-end">
                  <p className={clsx("hidden sm:flex text-xs px-2 py-1 rounded-lg text-center mb-3 text-white justify-center capitalize", config.textBG)}>
                    {notification.type}
                  </p>
                  <span className="text-xs text-trinary font-semibold truncate mt-4">
                    {formatDate(notification.createdAt)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Section>
  );
};
