import { CARTS_URL } from "@/constants";
import type { CartRespose, CartRequestParams, Cart } from "@/types";

/** Cart List */
const getCarts = async ({
  skip,
  limit,
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

/** Cart Detail */
const getCart = async ({ cartId }: { cartId: string }): Promise<Cart> => {
  const response = await fetch(`${CARTS_URL}/${cartId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch cart detail");
  }

  try {
    const data: Cart = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

export { getCarts, getCart };
