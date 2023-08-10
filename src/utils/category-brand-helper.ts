import { Product } from "@/types/products-type";

export const categoryBrandHelper = (
  products: Product[],
  category?: string | string[],
  brand?: string | string[],
) => {
  return products.filter((product) => {
    if (category && brand)
      return (
        product.category.includes(`${category}`) &&
        product.brand.includes(`${brand}`)
      );
    else if (category) return product.category.includes(`${category}`);
    else if (brand) return product.brand.includes(`${brand}`);
  });
};
