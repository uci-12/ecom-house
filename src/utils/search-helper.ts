import type { Product } from "@/types";

export const searchHelper = (products: Product[], q: string): Product[] => {
  const query = q.toLowerCase();

  return products.filter(({ title }: Product) => {
    return title.toLowerCase().includes(query);
  });
};
