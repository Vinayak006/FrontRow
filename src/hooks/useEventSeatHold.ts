import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import type { AxiosError } from "axios";
import type { APIError } from "@/types/error";
import { holdEventSeats } from "@/services/event.service";
import type {
  EventSeatHoldRequest,
  EventBookingIDResponse,
} from "@/types/event.types";

interface EventSeatHoldProps {
  onSuccess: (res: EventBookingIDResponse, req: EventSeatHoldRequest) => void;
}

export const useEventSeatHold = ({ onSuccess }: EventSeatHoldProps) => {
  const mutation = useMutation<
    EventBookingIDResponse,
    AxiosError<APIError>,
    EventSeatHoldRequest
  >({
    mutationFn: (data) => holdEventSeats(data),
    onSuccess: (response, request) => {
      onSuccess(response, request);
      toast.success("Seat confirmed successfully");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        "Seat confirming failed";
      toast.error(errorMessage);
    },
  });

  return {
    mutateEventSeatHold: mutation.mutate,
    isEventSeatHoldPending: mutation.isPending,
  };
};
