import { z } from "zod";

export const AdminUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["user", "admin"]),
  createdAt: z.string(),
  _count: z.object({
    postedTasks: z.number(),
    applications: z.number(),
  }),
});

export const AdminTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  status: z.string(),
  createdAt: z.string(),
  deadline: z.string(),
  postedBy: z.object({
    id: z.string(),
    name: z.string(),
  }),
  _count: z.object({
    applications: z.number(),
  }),
});

export const AdminFeedbackSchema = z.object({
  id: z.string(),
  subject: z.string(),
  message: z.string(),
  rating: z.number(),
  createdAt: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
});

export const AdminStatsSchema = z.object({
  totalUsers: z.number(),
  totalTasks: z.number(),
  totalApplications: z.number(),
  totalFeedbacks: z.number(),
});

export type AdminUser = z.infer<typeof AdminUserSchema>;
export type AdminTask = z.infer<typeof AdminTaskSchema>;
export type AdminFeedback = z.infer<typeof AdminFeedbackSchema>;
export type AdminStats = z.infer<typeof AdminStatsSchema>;