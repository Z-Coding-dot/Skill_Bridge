import { MessageSchema, type Message } from "@/schemas/message.schema";
import {api} from "./client";
import { messagesMock } from "@/mock/dashboard.mock";
import z from "zod";


const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === "true";
const MessageListSchema = z.array(MessageSchema)

export const getMessages = async (): Promise<Message[]> => {

  if(USE_MOCK_API){

    return MessageListSchema.parse(messagesMock);
  }


  const res = await api.get("/messages");
  return MessageListSchema.parse(res.data);
};
