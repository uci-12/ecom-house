import type { NextApiRequest, NextApiResponse } from "next";
import { PRODUCTS_URL } from "@/constants";

export default async function categoriesHandler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch(`${PRODUCTS_URL}/categories`);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
