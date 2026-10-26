import { ENDPOINTS } from "@/const/endpoints";
import axios, { AxiosError, type AxiosResponse } from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      const requestUrl = error.config?.url ?? "";

      const isMeRequest = requestUrl.includes(ENDPOINTS.USERS.ME);

      if (status === 401 && !isMeRequest) {
        toast.error("Session expired. Login to continue");
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  },
);
