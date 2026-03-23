import { DashboardOverviewSchema, type DashboardOverview } from "@/schemas/dashboard.schema";
import {api} from "./client";
import { dashboardMock } from "@/mock/dashboard.mock";
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === "true";


export const getDashboardOverview = async (): Promise<DashboardOverview> => {
  if(USE_MOCK_API) {
    return DashboardOverviewSchema.parse(dashboardMock);
  }

  const res = await api.get("/dashboard/overview")
  return DashboardOverviewSchema.parse(res.data);
}