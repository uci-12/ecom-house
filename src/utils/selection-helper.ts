import type { Product } from "@/types/products-type";

export const selectionHelper = (
  product: Product,
  selectParams: string[],
): Product => {
  const selectedProductMap = new Map();
  selectParams.forEach((field) => {
    selectedProductMap.set(field, product[field as keyof Product]);
  });
  const resultProduct = Object.fromEntries(selectedProductMap);
  return resultProduct as Product;
};
