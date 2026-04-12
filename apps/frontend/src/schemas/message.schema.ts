import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  text: z.string(),
  createdAt: z.string(),
  isRead: z.boolean(),
});

export const ConversationSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  lastMessage: z.string().optional(),
  lastMessageAt: z.string().optional(),
  unreadCount: z.number().optional(),
  isOnline: z.boolean().optional(),
});

export type Message = z.infer<typeof MessageSchema>;
export type MessageType = Message;
export type Conversation = z.infer<typeof ConversationSchema>;
export type ChatUser = Conversation;
