import { CARTS_URL } from "@/constants";
import type { CartRespose, CartRequestParams } from "@/types";

const getCarts = async ({
  limit,
  skip,
}: CartRequestParams): Promise<CartRespose> => {
  const url = new URL(CARTS_URL);

  if (skip !== undefined) {
    url.searchParams.set("skip", skip.toString());
  }

  if (limit !== undefined) {
    url.searchParams.set("limit", limit.toString());
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch cart list");
  }

  try {
    const data: CartRespose = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

export { getCarts };
