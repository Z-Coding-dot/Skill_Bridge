import {z}  from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  text: z.string(),
  createdAt: z.string(),
  isRead: z.boolean(),
});

export const ChatUser = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  lastMessage: z.string().optional(),
  lastMessageTime: z.string().optional(),
  unreadCount: z.number().optional(),
});

export type ChatUser = z.infer<typeof MessageSchema>;
export type Message = z.infer<typeof MessageSchema>;