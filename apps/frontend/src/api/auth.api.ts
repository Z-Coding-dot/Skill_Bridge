import { api } from "./client";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type SignupPayload = {
  name: string;
  email: string;
  bio?: string;
  skills: { value: string }[];
  password: string;
};

export const signup = async (payload: SignupPayload): Promise<AuthUser> => {
  const res = await api.post<{ user: AuthUser }>("/auth/signup", payload);
  return res.data.user;
};

export const login = async (payload: LoginPayload): Promise<AuthUser> => {
  const res = await api.post<{ user: AuthUser }>("/auth/login", payload);
  return res.data.user;
};
