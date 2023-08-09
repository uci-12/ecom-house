import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type {
  ProductRequestParams,
  ProductResponseMapped,
} from "@/types/productsType";
import { getProducts } from "./endpoint";

const useGetProducts = (
  params?: ProductRequestParams,
  options?: UseQueryOptions<ProductResponseMapped>,
) => {
  return useQuery<ProductResponseMapped>({
    queryKey: [
      "products",
      {
        brand: params?.brand ?? "",
        category: params?.category ?? "",
        minPrice: params?.minPrice ?? 0,
        maxPrice: params?.maxPrice ?? 0,
        q: params?.q ?? "",
        skip: params?.skip ?? 0,
        limit: params?.limit ?? 10,
      },
    ],
    queryFn: () =>
      getProducts({
        brand: params?.brand ?? "",
        category: params?.category ?? "",
        minPrice: params?.minPrice ?? 0,
        maxPrice: params?.maxPrice ?? 0,
        q: params?.q ?? "",
        skip: params?.skip ?? 0,
        limit: params?.limit ?? 10,
      }),
    ...options,
  });
};

export { useGetProducts };
