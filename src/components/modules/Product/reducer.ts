import { useReducer } from "react";
import { SET_PAGINATION } from "@/constants";

type Pagination = {
  page: number;
  perPage: number;
};

type CategoryBrandFilter = {
  categoryName?: string;
  brandName?: string;
};

type State = {
  pagination: Pagination;
  search?: string;
  filter: CategoryBrandFilter;
  priceRange: [number | undefined, number | undefined];
};

type Action = { type: "SET_PAGINATION"; payload: Pagination };

const productsReducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case SET_PAGINATION:
      return { ...state, pagination: payload };
    default:
      return state;
  }
};

const useProductsReducer = (defaultState: State) => {
  const [state, dispatch] = useReducer(productsReducer, defaultState);

  return { state, dispatch };
};

export { useProductsReducer, productsReducer };
