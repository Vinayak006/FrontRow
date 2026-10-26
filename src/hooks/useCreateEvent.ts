import { useMutation } from "@tanstack/react-query";
import { createEvent } from "../services/event.service";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { APIError } from "@/types/error";
import type { EventInput } from "@/types/event.types";

export const useCreateEvent = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, AxiosError<APIError>, EventInput>({
    mutationFn: createEvent,

    onSuccess: () => {
      toast.success("Venue created successfully");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.detail || error.message || "Login failed";
      toast.error(errorMessage);
    },
  });
};
