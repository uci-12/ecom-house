import { useQuery } from "@tanstack/react-query";
import { getCarts, getCart } from ".";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { CartRequestParams, CartRespose, Cart } from "@/types";

/** useQuery Cart List */
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

/** useQuery Cart Detail */
function useGetCart(
  { cartId }: { cartId: string },
  options?: UseQueryOptions<Cart>,
) {
  return useQuery<Cart>({
    queryKey: ["carts", cartId],
    queryFn: () => getCart({ cartId }),
    ...options,
  });
}

export { useGetCarts, useGetCart };
