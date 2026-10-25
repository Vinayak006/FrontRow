import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signout } from "../services/auth.service";
import { USERS_ME_QUERY_KEY } from "@/const/querykey";
import type { AxiosError } from "axios";
import type { APIError } from "@/types/error";

export const useSignout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<APIError>>({
    mutationFn: signout,
    onSuccess: () => {
      queryClient.setQueryData(USERS_ME_QUERY_KEY, null);
      toast.success("Signed out successful");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.detail || error.message || "Signout failed";
      toast.error(errorMessage);
    },
  });
};
