import { z } from "zod";

export const FeedbackSchema = z.object({
  id: z.string(),
  userId: z.string(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  rating: z.number().min(1).max(5),
  createdAt: z.string(),
});

export const CreateFeedbackSchema = z.object({
  userId: z.string(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  rating: z.number().min(1).max(5),
});

export type Feedback = z.infer<typeof FeedbackSchema>;
export type CreateFeedback = z.infer<typeof CreateFeedbackSchema>;