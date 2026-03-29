import { z } from "zod";
import { api } from "./client";
import { ApplicationSchema, type Application } from "@/schemas/application.schema";
import { applicationsMock } from "@/mock/dashboard.mock";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === "true";

const ApplicationListSchema = z.array(ApplicationSchema);
const CreateApplicationSchema = z.object({
  taskId: z.string(),
  pitch: z.string(),
});

export const getApplications = async (): Promise<Application[]> => {
  if (USE_MOCK_API) {
    return ApplicationListSchema.parse(applicationsMock);
  }

  const res = await api.get("/applications");
  return ApplicationListSchema.parse(res.data);
};

export const submitApplication = async (
  app: { taskId: string; pitch: string }
): Promise<Application> => {
  if (USE_MOCK_API) {
    const payload = CreateApplicationSchema.parse(app);
    return ApplicationSchema.parse({
      ...payload,
      id: crypto.randomUUID(),
      taskTitle: "Mock Task",
      status: "pending",
    });
  }

  const payload = CreateApplicationSchema.parse(app);
  const res = await api.post("/applications", payload);
  return ApplicationSchema.parse(res.data);
};
