import {z} from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(["Gig", "Internship", "Tutoring", "Project", "Freelance"]),
  deadline: z.string(),
  type: z.enum(["Gig", "Internship", "Tutoring"]),
  postedBy: {
    id: z.string(),
    name: z.string(),
    avatar: z.string().optional(),
  },
  status: z.enum(["Open", "Closed"]),
  createdAt: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;