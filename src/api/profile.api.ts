import type { Profile } from "@/schemas/profile.schema";
import { api } from "./client";



export const getProfile = async (): Promise<Profile> => {
  const res = await api.get("/profile");
  return {
    ...res.data,
    skills: Array.isArray(res.data.skills) ? res.data.skills : [],
  };
};

export const updateProfile = async (data: Partial<Profile>) => {
  return api.put("/profile", data);
};
