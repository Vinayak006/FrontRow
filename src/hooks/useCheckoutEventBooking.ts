import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import type { APIError } from "@/types/error";
import type { AxiosError } from "axios";
import { checkoutEventBooking } from "@/services/event.service";
import type { EventBookingIDResponse } from "@/types/event.types";

interface CheckoutEventBookingProps {
  onSuccess: () => void;
}

export const useCheckoutEventBooking = ({
  onSuccess,
}: CheckoutEventBookingProps) => {
  const { mutate, isPending } = useMutation<
    EventBookingIDResponse,
    AxiosError<APIError>,
    number
  >({
    mutationFn: (booking_id) => checkoutEventBooking(booking_id),
    onSuccess: () => {
      onSuccess();
      toast.success("Event booked successfully");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.detail || error.message || "Checkout failed";
      toast.error(errorMessage);
    },
  });

  return { mutateEventBookingCheckout: mutate, isCheckoutPending: isPending };
};
