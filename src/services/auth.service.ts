import type {
  LoginFormValues,
  RegisterFormValues,
} from "@/pages/Auth/helpers/zod/auth";
import { api } from "./api";
import type { UserResponse } from "@/types/user";
import { ENDPOINTS } from "@/const/endpoints";

export const login = async (data: LoginFormValues): Promise<UserResponse> => {
  const response = await api.post<UserResponse>(ENDPOINTS.USERS.LOGIN, data);
  return response.data;
};

export const register = async (
  data: RegisterFormValues,
): Promise<UserResponse> => {
  const response = await api.post<UserResponse>(ENDPOINTS.USERS.REGISTER, data);
  return response.data;
};

export const getMe = async (): Promise<UserResponse> => {
  const response = await api.get<UserResponse>(ENDPOINTS.USERS.ME);
  return response.data;
};

export const signout = async (): Promise<void> => {
  await api.post(ENDPOINTS.USERS.SIGNOUT);
};
