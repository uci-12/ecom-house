import { useQuery } from "@tanstack/react-query";
import { getCarts } from ".";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { CartRequestParams, CartRespose } from "@/types";

function useGetCarts(
  params?: CartRequestParams,
  options?: UseQueryOptions<CartRespose>,
) {
  return useQuery<CartRespose>({
    queryKey: ["carts", { ...params }],
    queryFn: () => getCarts({ ...params }),
    ...options,
  });
}

export { useGetCarts };
