import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { sendMessage } from "@/services/llm.service";
import type { APIError } from "@/types/error";
import type { EventRead } from "@/types/event.types";
import type { AxiosError } from "axios";
import type { LLMSendMessageRequest } from "@/types/llm.types";

interface LLMSendMessageProps {
  onSuccess: (res: EventRead[]) => void;
}

export const useLLMSendMessage = ({ onSuccess }: LLMSendMessageProps) => {
  const { mutate, isPending } = useMutation<
    EventRead[],
    AxiosError<APIError>,
    LLMSendMessageRequest
  >({
    mutationFn: (data) => sendMessage(data),
    onSuccess: (response) => {
      onSuccess(response);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        "Failed to process message";
      toast.error(errorMessage);
    },
  });

  return { mutateSendLLMMessage: mutate, isSendingMessage: isPending };
};
