import { z } from "zod";
import { api } from "./client";
import { TaskSchema, type Task } from "@/schemas/task.schema";
import { tasksMock } from "@/mock/dashboard.mock";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === "true";
const TaskListSchema = z.array(TaskSchema);
const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
});

export const getTasks = async (): Promise<Task[]> => {
  if (USE_MOCK_API) {
    return TaskListSchema.parse(tasksMock);
  }

  const res = await api.get<Task[]>("/tasks");
  return TaskListSchema.parse(res.data);
};

export const getMyTasks = getTasks;

export const getTaskById = async (id: string): Promise<Task> => {
  if (USE_MOCK_API) {
    const task = tasksMock.find((item) => item.id === id);

    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    return TaskSchema.parse(task);
  }

  const res = await api.get<Task>(`/tasks/${id}`);
  return TaskSchema.parse(res.data);
};

export const createTask = async (
  data: Omit<Task, "id" | "createdAt">,
): Promise<Task> => {
  const payload = CreateTaskSchema.parse(data);

  if (USE_MOCK_API) {
    return TaskSchema.parse({
      ...payload,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    });
  }

  const res = await api.post<Task>("/tasks", payload);
  return TaskSchema.parse(res.data);
};
