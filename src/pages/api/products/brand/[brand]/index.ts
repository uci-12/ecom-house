import {
  paginationHelper,
  selectionHelper,
  priceRangeHelper,
  searchHelper,
  categoryBrandHelper,
} from "@/utils";
import { PRODUCTS_URL } from "@/constants";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ProductsResponse, Product } from "@/types";

const brandHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    limit = "0",
    skip = "0",
    select,
    minPrice,
    maxPrice,
    q,
    brand,
    category,
  } = req.query;
  const url = new URL(`${PRODUCTS_URL}`);

  url.searchParams.set("limit", "0");

  const response = await fetch(url);
  const data: ProductsResponse = await response.json();

  let products = data.products.filter(
    (product: Product) => product.brand === brand,
  );
  let totalProducts = products.length;

  if (minPrice && maxPrice) {
    products = priceRangeHelper(products, Number(minPrice), Number(maxPrice));
    totalProducts = products.length;
  }

  if (q) {
    products = searchHelper(products, q as string);
    totalProducts = products.length;
  }

  if (brand || category) {
    products = categoryBrandHelper(products, category, brand);
    totalProducts = products.length;
  }

  if (select) {
    const defaultSelectedField = "id,";
    const selectFields = ((defaultSelectedField + select) as string).split(",");
    products = products.map((product: Product) => {
      return selectionHelper(product, selectFields);
    });
  }

  products = paginationHelper(products, Number(skip), Number(limit));
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({
    products: products,
    total: totalProducts,
    skip: Number(skip),
    limit: Number(limit),
  });
};

export default brandHandler;
