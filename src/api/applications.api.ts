import { z } from "zod";
import { api } from "./client";
import { ApplicationSchema, type Application } from "@/schemas/application.schema";
import { applicationsMock } from "@/mock/dashboard.mock";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === "true";

const ApplicationListSchema = z.array(ApplicationSchema);

export const getApplications = async () => {
  if (USE_MOCK_API) {
    console.log("Using applications mock API");
    return ApplicationListSchema.parse(applicationsMock);
  }

  const res = await api.get("/applications");
  return ApplicationListSchema.parse(res.data);
};

export const submitApplication = async (
  app: Partial<Application>
) => {
  if (USE_MOCK_API) {
    console.log("Using applications mock API");
    return ApplicationSchema.parse({
      ...app,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "Pending",
    });
  }

  const res = await api.post("/applications", app);
  return ApplicationSchema.parse(res.data);
};
