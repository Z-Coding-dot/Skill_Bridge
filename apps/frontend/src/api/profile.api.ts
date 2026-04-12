import type { ProfileSchema } from "@/schemas/profile.schema";
import { api } from "./client";
import { profileMock } from "@/mock/dashboard.mock";

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === "true";

type UpdateProfilePayload = Partial<ProfileSchema> & { avatar?: File | string | null };

export const getProfile = async (): Promise<ProfileSchema> => {
  if (USE_MOCK_API) return profileMock;
  const res = await api.get("/profile");
  return {
    ...res.data,
    skills: Array.isArray(res.data.skills) ? res.data.skills : [],
    avatar: res.data.avatar ?? null,
  };
};

export const updateProfile = async (data: UpdateProfilePayload) => {
  const avatar = data.avatar as unknown;
  if (avatar instanceof File) {
    const formData = new FormData();
    formData.append("avatar", avatar);
    if (data.name)   formData.append("name", data.name);
    if (data.email)  formData.append("email", data.email);
    if (data.bio)    formData.append("bio", data.bio);
    if (data.skills) formData.append("skills", JSON.stringify(data.skills));

    return api.put("/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  return api.put("/profile", data);
};

export const getProfileById = async (id: string): Promise<ProfileSchema> => {
  const res = await api.get(`/profile/${id}`);
  return {
    ...res.data,
    skills: Array.isArray(res.data.skills) ? res.data.skills : [],
    avatar: res.data.avatar ?? null,
  };
};