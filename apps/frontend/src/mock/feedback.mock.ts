import type { Feedback } from "@/schemas/feedback.schema";

export const feedbackMock: Feedback[] = [
  {
    id: "feedback-1",
    userId: "user-1",
    subject: "Good dashboard experience",
    message: "The dashboard is easy to use, but it would be better if notifications were grouped.",
    rating: 4,
    createdAt: new Date().toISOString(),
  },
];