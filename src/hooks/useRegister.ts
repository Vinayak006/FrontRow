import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { register } from "@/services/auth.service";
import type { UserResponse } from "@/types/user.types";
import type { AxiosError } from "axios";
import type { APIError } from "@/types/error";
import type { RegisterFormValues } from "@/pages/Auth/helpers/zod/auth";

interface registerProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export function useRegister({ onError, onSuccess }: registerProps) {
  return useMutation<UserResponse, AxiosError<APIError>, RegisterFormValues>({
    mutationFn: register,
    onSuccess: () => {
      onSuccess?.();
      toast.success("Registered successful");
    },
    onError: (error) => {
      onError?.();
      const errorMessage =
        error.response?.data?.detail || error.message || "Registration failed";
      toast.error(errorMessage);
    },
  });
}
