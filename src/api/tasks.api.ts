import { z } from "zod";
import { api } from "./client";
import { TaskSchema, type Task } from "@/schemas/task.schema";
import { tasksMock } from "@/mock/dashboard.mock";

const USE_MOCK_API = true;
const TaskListSchema = z.array(TaskSchema);


export const getMyTasks = async (): Promise<Task[]> => {
  if (USE_MOCK_API) {
    return TaskListSchema.parse(tasksMock);
  }

  const res = await api.get<Task[]>("/tasks");
  return TaskListSchema.parse(res.data);
};
