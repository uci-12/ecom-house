/** Endpoint */
const BASE_URL = "https://dummyjson.com";

const PRODUCTS_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/products"
    : process.env.NEXT_PUBLIC_PRODUCT_API_URL;

const PRODUCTS_URL = BASE_URL + "/products";
const CARTS_URL = BASE_URL + "/carts";
const USERS_URL = BASE_URL + "/users";

/** Products Action */
const SET_PAGINATION = "SET_PAGINATION";
const SET_FILTER = "SET_FILTER";
const SET_PRICE_RANGE = "SET_PRICE_RANGE";
const SET_SEARCH = "SET_SEARCH";

export {
  PRODUCTS_URL,
  PRODUCTS_BASE_URL,
  CARTS_URL,
  USERS_URL,
  SET_PAGINATION,
  SET_FILTER,
  SET_PRICE_RANGE,
  SET_SEARCH,
};
