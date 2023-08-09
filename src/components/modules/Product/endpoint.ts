import { PRODUCTS_URL } from "@/constants";
import type {
  ProductResponseMapped,
  ProductRequestParams,
  Product,
} from "@/types/productsType";

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
  let baseURL = `${PRODUCTS_URL}`;
  if (category !== undefined && category !== "") {
    baseURL = `${PRODUCTS_URL}/category/${category}`;
  }
  if (brand !== undefined && brand !== "") {
    baseURL = `${PRODUCTS_URL}/brand/${brand}`;
  }
  const url = new URL(`${baseURL}`);

  const parameters = {
    skip,
    limit,
    select,
    minPrice,
    maxPrice,
    q,
  };

  for (const param in parameters) {
    const value = parameters[param as keyof typeof parameters];
    if (value !== undefined && value !== 0) {
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

export { getProducts };
