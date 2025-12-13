import type { Notification } from "@/schemas/notification.schema";
import { api } from "./client";


export const getNotifications = async (): Promise<Notification[]> => {
  const res  = await api.get<Notification[]>("/notifications");
  return res.data;
};
