import { Product } from "@/types/productsType";

const priceRangeHelper = (
  products: Product[],
  minPrice: number,
  maxPrice: number,
) => {
  return products.filter(
    (product) =>
      product.price >= Number(minPrice) && product.price <= Number(maxPrice),
  );
};

export { priceRangeHelper };
