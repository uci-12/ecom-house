import { useReducer } from "react";
import { SET_FILTER, SET_PAGINATION } from "@/constants";

type Pagination = {
  page: number;
  perPage: number;
};

type CategoryBrandFilter = {
  category?: string;
  brand?: string;
};

type State = {
  pagination: Pagination;
  search?: string;
  filter: CategoryBrandFilter;
  priceRange: [number | undefined, number | undefined];
};

type Action =
  | { type: "SET_PAGINATION"; payload: Pagination }
  | { type: "SET_FILTER"; payload: CategoryBrandFilter };

const productsReducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case SET_PAGINATION:
      return { ...state, pagination: payload };
    case SET_FILTER:
      return {
        ...state,
        pagination: { ...state.pagination, page: 1 },
        filter: payload,
      };
    default:
      return state;
  }
};

const useProductsReducer = (defaultState: State) => {
  const [state, dispatch] = useReducer(productsReducer, defaultState);

  return { state, dispatch };
};

export { useProductsReducer, productsReducer };
