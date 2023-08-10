import { Product } from "@/types";

export const priceRangeHelper = (
  products: Product[],
  minPrice: number,
  maxPrice: number,
) => {
  return products.filter(
    (product) =>
      product.price >= Number(minPrice) && product.price <= Number(maxPrice),
  );
};
