import type {ProfileSchema } from "@/schemas/profile.schema";
import { api } from "./client";
import { profileMock } from "@/mock/dashboard.mock";


const USE_MOCK_API = true;

export const getProfile = async (): Promise<ProfileSchema> => {
  if (USE_MOCK_API) {
    return profileMock
  }
  const res = await api.get("/profile");
  return {
    ...res.data,
    skills: Array.isArray(res.data.skills) ? res.data.skills : [],
  };
};

export const updateProfile = async (data: Partial<ProfileSchema>) => {
  return api.put("/profile", data);
};
