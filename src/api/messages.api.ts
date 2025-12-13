import type { Message } from "@/schemas/message.schema";
import {api} from "./client";


export const getMessages = async (): Promise<Message[]> => {
  const res = await api.get("/messages");
  return Array.isArray(res.data.messages) ? res.data.messages : [];
};
