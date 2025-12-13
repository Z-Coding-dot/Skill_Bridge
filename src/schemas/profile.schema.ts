import {z} from "zod";

export const Skill = z.object({
    id: z.string(),
    label: z.string(),
});
export const ProfileSchema = z.object({
    name: z.string(),
    email: z.string(),
    bio: z.string(),
    skills: z.array(Skill),
})

export type Profile = z.infer<typeof ProfileSchema>
export type Skill = z.infer<typeof Skill>