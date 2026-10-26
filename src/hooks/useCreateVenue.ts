import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import type { AxiosError } from "axios";
import { createVenue } from "../services/venue.service";
import type { VenueFormValues } from "@/pages/VenueForm/helpers/zod/venue";
import type { APIError } from "@/types/error";
import type { VenueRead } from "@/types/venue.types";

export const useCreateVenue = () => {
  return useMutation<VenueRead, AxiosError<APIError>, VenueFormValues>({
    mutationFn: createVenue,
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
