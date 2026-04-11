import {z} from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(["Gig", "Internship", "Tutoring", "Project", "Freelance", "Job", "Other"]),
  deadline: z.string(),
  postedBy: z.object ({
    id: z.string(),
    name: z.string(),
    avatar: z.string().nullable().optional(),
  }),
  status: z.enum(["Open", "Closed"]),
  createdAt: z.string(),
});

export type TaskCategory = z.infer<typeof TaskSchema>["category"];
export type Task = z.infer<typeof TaskSchema>;