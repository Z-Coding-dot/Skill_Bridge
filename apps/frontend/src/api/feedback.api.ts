import { z } from "zod";
import { api } from "./client";
import {
  FeedbackSchema,
  CreateFeedbackSchema,
  type Feedback,
  type CreateFeedback,
} from "@/schemas/feedback.schema";
import { feedbackMock } from "@/mock/feedback.mock";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === "true";

const FeedbackListSchema = z.array(FeedbackSchema);

export const getFeedbackList = async (): Promise<Feedback[]> => {
  if (USE_MOCK_API) {
    return FeedbackListSchema.parse(feedbackMock);
  }

  const res = await api.get("/feedback");
  return FeedbackListSchema.parse(res.data);
};

export const submitFeedback = async (
  data: CreateFeedback
): Promise<Feedback> => {
  const parsed = CreateFeedbackSchema.parse(data);

  if (USE_MOCK_API) {
    return FeedbackSchema.parse({
      ...parsed,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    });
  }

  const res = await api.post("/feedback", parsed);
  return FeedbackSchema.parse(res.data);
};