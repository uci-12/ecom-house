import { Product } from "@/types/products-type";

export const searchHelper = (products: Product[], q: string): Product[] => {
  const query = q.toLowerCase();

  return products.filter(({ title }: Product) => {
    return title.toLowerCase().includes(query);
  });
};
