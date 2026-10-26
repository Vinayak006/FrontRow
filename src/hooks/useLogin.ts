import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { login } from "../services/auth.service";
import type { APIError } from "@/types/error";
import type { UserResponse } from "@/types/user.types";
import type { AxiosError } from "axios";
import type { LoginFormValues } from "@/pages/Auth/helpers/zod/auth";

interface loginProps {
  onSuccess?: (user: UserResponse) => void;
  onError?: () => void;
}

export function useLogin({ onSuccess, onError }: loginProps) {
  return useMutation<UserResponse, AxiosError<APIError>, LoginFormValues>({
    mutationFn: login,
    onSuccess: (user) => {
      onSuccess?.(user);
      toast.success("Login successful");
    },
    onError: (error) => {
      onError?.();
      const errorMessage =
        error.response?.data?.detail || error.message || "Login failed";
      toast.error(errorMessage);
    },
  });
}
