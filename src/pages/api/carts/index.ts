import type { NextApiRequest, NextApiResponse } from "next";
import { CARTS_URL } from "@/constants";
import { CartRespose } from "@/types";

export default async function cartsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { limit = "0", skip = "0" } = req.query;
  const url = new URL(`${CARTS_URL}`);

  url.searchParams.set("limit", "0");

  const response = await fetch(url);
  const data: CartRespose = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({
    carts: data.carts,
    total: data.total,
    skip: Number(skip),
    limit: Number(limit),
  });
}
