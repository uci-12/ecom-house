import type { Product } from "@/types";

export const paginationHelper = (
  products: Product[],
  skip: number,
  limit: number,
): Product[] => {
  return limit !== 0
    ? products.slice(skip, skip + limit)
    : products.slice(skip);
};
