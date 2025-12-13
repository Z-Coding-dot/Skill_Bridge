import { z } from "zod";
import { api } from "./client";
import { TaskSchema, type Task } from "@/schemas/task.schema";
import { tasksMock } from "@/mock/dashboard.mock";

const TaskListSchema = z.array(TaskSchema);
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === "true";

export const getMyTasks = async (): Promise<Task[]> => {
  if (USE_MOCK_API) {
    console.log("Using TASKS mock API");
    return TaskListSchema.parse(tasksMock);
  }

  const res = await api.get("/tasks");
  return TaskListSchema.parse(res.data.tasks);
};
