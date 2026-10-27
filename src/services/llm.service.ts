import { api } from "./api";
import { ENDPOINTS } from "@/const/endpoints";
import type { EventRead } from "@/types/event.types";
import type { LLMSendMessageRequest } from "@/types/llm.types";

export const sendMessage = async (
  data: LLMSendMessageRequest,
): Promise<EventRead[]> => {
  const response = await api.post<EventRead[]>(ENDPOINTS.LLM.CHAT, data);
  return response.data;
};
