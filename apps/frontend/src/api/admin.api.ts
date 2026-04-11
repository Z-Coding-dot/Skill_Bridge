import { z } from "zod";
import { api } from "./client";
import {
  AdminUserSchema,
  AdminTaskSchema,
  AdminFeedbackSchema,
  AdminStatsSchema,
  type AdminUser,
  type AdminTask,
  type AdminFeedback,
  type AdminStats,
} from "@/schemas/admin.schema";

const AdminUserListSchema = z.array(AdminUserSchema);
const AdminTaskListSchema = z.array(AdminTaskSchema);
const AdminFeedbackListSchema = z.array(AdminFeedbackSchema);

export const getAdminStats = async (): Promise<AdminStats> => {
  const res = await api.get("/admin/stats");
  return AdminStatsSchema.parse(res.data);
};

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const res = await api.get("/admin/users");
  return AdminUserListSchema.parse(res.data);
};

export const deleteAdminUser = async (id: string): Promise<void> => {
  await api.delete(`/admin/users/${id}`);
};

export const getAdminTasks = async (): Promise<AdminTask[]> => {
  const res = await api.get("/admin/tasks");
  return AdminTaskListSchema.parse(res.data);
};

export const deleteAdminTask = async (id: string): Promise<void> => {
  await api.delete(`/admin/tasks/${id}`);
};

export const getAdminFeedbacks = async (): Promise<AdminFeedback[]> => {
  const res = await api.get("/admin/feedbacks");
  return AdminFeedbackListSchema.parse(res.data);
};

export const deleteAdminFeedback = async (id: string): Promise<void> => {
  await api.delete(`/admin/feedbacks/${id}`);
};