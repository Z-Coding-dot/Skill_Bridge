import z from "zod";
import { api } from "./client";
import {
  ConversationSchema,
  MessageSchema,
  type Conversation,
  type Message,
} from "@/schemas/message.schema";
import { conversationsMock, mockMessagesByUser } from "@/mock/dashboard.mock";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === "true";
const MessageListSchema = z.array(MessageSchema);
const ConversationListSchema = z.array(ConversationSchema);

type SendMessagePayload = {
  receiverId: string;
  text: string;
};

const getMockMessages = (userId: string): Message[] => {
  return MessageListSchema.parse(mockMessagesByUser[userId] ?? []);
};

export const getConversations = async (): Promise<Conversation[]> => {
  if (USE_MOCK_API) {
    return ConversationListSchema.parse(conversationsMock);
  }

  const res = await api.get<Conversation[]>("/messages/conversations");
  return ConversationListSchema.parse(res.data);
};

export const getConversationMessages = async (userId: string): Promise<Message[]> => {
  if (USE_MOCK_API) {
    return getMockMessages(userId);
  }

  const res = await api.get<Message[]>(`/messages/${userId}`);
  return MessageListSchema.parse(res.data);
};

export const sendMessage = async (payload: SendMessagePayload): Promise<Message> => {
  if (USE_MOCK_API) {
    return MessageSchema.parse({
      id: crypto.randomUUID(),
      senderId: "user-1",
      receiverId: payload.receiverId,
      text: payload.text,
      createdAt: new Date().toISOString(),
      isRead: false,
    });
  }

  const res = await api.post<Message>("/messages", payload);
  return MessageSchema.parse(res.data);
};

export const markConversationAsRead = async (userId: string): Promise<void> => {
  if (USE_MOCK_API) {
    return;
  }

  await api.patch(`/messages/${userId}/read`);
};
