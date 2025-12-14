import {z} from "zod";

export const NotificationSchema = z.object({
  id: z.string(),
  type: z.enum(["info", "success", "warning", "error"]),
  title: z.string(),
  message: z.string(),
  createdAt: z.string(),
});

export type Notification = z.infer<typeof NotificationSchema>;