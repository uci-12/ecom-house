import type { NextApiRequest, NextApiResponse } from "next";
import { CARTS_URL } from "@/constants";

export default async function cartHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { cartId = "" } = req.query;
  const url = new URL(`${CARTS_URL}/${cartId}`);

  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
