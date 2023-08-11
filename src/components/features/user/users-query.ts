import { useQuery } from "@tanstack/react-query";
import { getUser } from ".";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { User } from "@/types";

/** useQuery User Detail */
function useGetUser({ id }: { id: string }, options?: UseQueryOptions<User>) {
  return useQuery<User>({
    queryKey: ["users", id],
    queryFn: () => getUser({ id }),
    ...options,
  });
}

export { useGetUser };
