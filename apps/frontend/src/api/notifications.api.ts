import { NotificationSchema, type Notification } from "@/schemas/notification.schema";
import { api } from "./client";
import { notificationsMock } from "@/mock/dashboard.mock";
import z from "zod";

const USE_MOCK_API = true;
const NotificationListSchema = z.array(NotificationSchema);

export const getNotifications = async (): Promise<Notification[]> => {
  if(USE_MOCK_API){
    return NotificationListSchema.parse(notificationsMock);
  }
  const res  = await api.get<Notification[]>("/notifications");
  return NotificationListSchema.parse(res.data);
};

