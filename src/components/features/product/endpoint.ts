import { PRODUCTS_BASE_URL } from "@/constants";
import type {
  ProductResponseMapped,
  ProductRequestParams,
  Product,
} from "@/types";

const getProducts = async ({
  skip,
  limit,
  select,
  minPrice,
  maxPrice,
  category,
  brand,
  q,
}: ProductRequestParams): Promise<ProductResponseMapped> => {
  const url = new URL(`${PRODUCTS_BASE_URL}`);

  const parameters = {
    skip,
    limit,
    select,
    minPrice,
    maxPrice,
    q,
    category,
    brand,
  };

  for (const param in parameters) {
    const value = parameters[param as keyof typeof parameters];
    if (value !== undefined && value !== 0 && value !== "") {
      url.searchParams.set(param, String(value));
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch product list!");
  }

  try {
    const data = await response.json();
    const productsMapping =
      data?.products?.length &&
      (await data.products.map((product: Product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
      })));
    return { ...data, products: productsMapping };
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

const getProductsCategories = async (): Promise<string[]> => {
  const url = new URL(`${PRODUCTS_BASE_URL}/categories`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products categories!");
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

const getProductsBrands = async (): Promise<string[]> => {
  const url = new URL(`${PRODUCTS_BASE_URL}/brands`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products brands!");
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

export { getProducts, getProductsCategories, getProductsBrands };
