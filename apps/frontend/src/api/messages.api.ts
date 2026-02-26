import { MessageSchema, type Message } from "@/schemas/message.schema";
import {api} from "./client";
import { messagesMock } from "@/mock/dashboard.mock";
import z from "zod";


const USE_MOCK_API = true;
const MessageListSchema = z.array(MessageSchema)

export const getMessages = async (): Promise<Message[]> => {

  if(USE_MOCK_API){

    return MessageListSchema.parse(messagesMock);
  }


  const res = await api.get("/messages");
  return Array.isArray(res.data.messages) ? res.data.messages : [];
};
