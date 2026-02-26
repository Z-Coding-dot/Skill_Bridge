import { z } from "zod";

export const ActivitySchema = z.object({
  id: z.string(),
  text: z.string(),
  type: z.enum(["info", "success", "warning", "error"]),
  time: z.string(),
});

export const DashboardOverviewSchema = z.object({
    stats: z.object({
    tasksPosted: z.number(),
    applicationsSent: z.number(),
    accepted: z.number(),
  }),
  recentActivity: z.array(ActivitySchema),
});

export type DashboardOverview = z.infer<typeof DashboardOverviewSchema>;
