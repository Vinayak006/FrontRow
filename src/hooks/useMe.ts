import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/auth.service";
import { USERS_ME_QUERY_KEY } from "@/const/querykey";

export const useMe = () => {
  return useQuery({
    queryKey: USERS_ME_QUERY_KEY,
    queryFn: getMe,
    staleTime: Infinity,
    retry: false,
  });
};
