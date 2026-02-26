import {z} from "zod";

export const ApplicationSchema = z.object({
    id: z.string(),
    taskTitle: z.string(),
    status: z.enum(["pending", "accepted", "rejected"]),
    pitch: z.string(),
});


export type Application = z.infer<typeof ApplicationSchema>;