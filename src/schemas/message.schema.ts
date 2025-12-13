import {z}  from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  sender: z.string(),
  content: z.string(),
  createdAt: z.string(),
  read: z.boolean(),
});
export type Message = z.infer<typeof MessageSchema>;