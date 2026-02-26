import { z } from "zod";
import { api } from "./client";
import { ApplicationSchema, type Application } from "@/schemas/application.schema";
import { applicationsMock } from "@/mock/dashboard.mock";

const USE_MOCK_API = true;

const ApplicationListSchema = z.array(ApplicationSchema);

export const getApplications = async (): Promise<Application[]> => {
  if (USE_MOCK_API) {
    return ApplicationListSchema.parse(applicationsMock);
  }

  const res = await api.get("/applications");
  return ApplicationListSchema.parse(res.data);
};

export const submitApplication = async (
  app: Partial<Application>
): Promise<Application> => {
  if (USE_MOCK_API) {
    return ApplicationSchema.parse({
      ...app,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
    });
  }

  const res = await api.post("/applications", app);
  return ApplicationSchema.parse(res.data);
};

