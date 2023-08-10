import type { NextApiRequest, NextApiResponse } from "next";
import type { Product } from "@/types";
import { PRODUCTS_URL } from "@/constants";

export default async function categoriesHandler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch(`${PRODUCTS_URL}?limit=100`);
  const data = await response.json();

  const prodFilterByBrand = await data?.products?.filter(
    (value: Product, index: number, self: Product[]) =>
      index === self.findIndex((t) => t.brand === value.brand),
  );
  const brands = await prodFilterByBrand.map(
    (product: Product) => product.brand,
  );

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(brands);
}
