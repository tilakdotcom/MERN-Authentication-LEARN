import { sessionRequest } from "@/lib/api";
import { TSession } from "@/types/session";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const SESSIONS = "session";
export const useSesstions = (opts?: UseQueryOptions<TSession[]>) => {
  const { data:sessions = [], ...baki } = useQuery<TSession[]>({
    queryKey: [SESSIONS],
    queryFn: sessionRequest(),
    ...opts,
  });

  return { sessions, ...baki };
};
