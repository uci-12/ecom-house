import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import {
  ProductsTable,
  useGetProducts,
  useProductsReducer,
  useGetProductsCategories,
  ProductsFilter,
  useGetProductsBrands,
} from "@/components/modules/Product";
import Pagination from "@/components/modules/Pagination";
import { TableSkeleton } from "@/components/modules/Skeleton";
import { customQuery } from "@/utils";
import { useDebounce } from "@/hooks";
import { SET_PAGINATION, SET_FILTER } from "@/constants";
import type { ParsedUrlQuery } from "querystring";

const Products = () => {
  const router = useRouter();
  const {
    brand: qBrand,
    category: qCategory,
    minPrice: qMinPrice,
    maxPrice: qMaxPrice,
    page: qPage,
    perPage: qPerPage,
    q: qSearch,
  } = router.query;

  const qBrandValue = customQuery<string>(qBrand, "");
  const qCategoryValue = customQuery<string>(qCategory, "");
  const qMinPriceValue = Number(customQuery<number>(qMinPrice, 0));
  const qMaxPriceValue = Number(customQuery<number>(qMaxPrice, 0));
  const qPageValue = Number(customQuery<number>(qPage, 1));
  const qPerPageValue = Number(customQuery<number>(qPerPage, 10));
  const qSearchValue = customQuery<string>(qSearch, "");

  const { state, dispatch } = useProductsReducer({
    pagination: {
      page: qPageValue,
      perPage: qPerPageValue,
    },
    filter: {
      brand: qBrandValue,
      category: qCategoryValue,
    },
    search: qSearchValue,
    priceRange: [qMinPriceValue, qMaxPriceValue],
  });

  const { page, perPage } = state.pagination;
  const { brand, category } = state.filter;
  const [minPrice, maxPrice] = state.priceRange;
  const searchProductValue = state.search;

  const debouncedSearchProduct = useDebounce(searchProductValue ?? "", 1000);

  const {
    data: products,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    isSuccess: isProductsSuccess,
  } = useGetProducts({
    brand,
    category,
    limit: perPage,
    minPrice,
    maxPrice,
    q: debouncedSearchProduct,
    skip: (page - 1) * perPage,
    select: "title,price,stock,brand,category",
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetching,
    isSuccess: isCategoriesSuccess,
  } = useGetProductsCategories({
    staleTime: Infinity,
  });

  const {
    data: brands,
    isLoading: isBrandsLoading,
    isFetching: isBrandsFetching,
    isSuccess: isBrandsSuccess,
  } = useGetProductsBrands({
    staleTime: Infinity,
  });

  const onChangePagination = (page: number, perPage: number) => {
    dispatch({
      type: SET_PAGINATION,
      payload: { page, perPage },
    });
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page,
          perPage,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const onChangeSelect = (value: string, name: string) => {
    dispatch({
      type: SET_FILTER,
      payload: { ...state.filter, [name]: value },
    });

    const newQuery: Record<string, unknown> = {
      ...router.query,
      page: 1,
      [name]: value,
    };

    router.push(
      {
        pathname: router.pathname,
        query: newQuery as ParsedUrlQuery,
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <Flex flexDirection="column" gap={5}>
      {isCategoriesSuccess && isBrandsSuccess && (
        <ProductsFilter
          categories={categories}
          brands={brands}
          formValues={{
            brand,
            category,
            minPrice: minPrice === 0 ? undefined : minPrice,
            maxPrice: maxPrice === 0 ? undefined : maxPrice,
            q: searchProductValue,
          }}
          onChangeSelect={onChangeSelect}
        />
      )}
      {isProductsLoading || isProductsFetching ? (
        <TableSkeleton />
      ) : isProductsSuccess && products?.products ? (
        <ProductsTable products={products.products} />
      ) : null}
      <Pagination
        currentPage={page}
        perPage={perPage}
        total={products?.total ?? 0}
        onChange={onChangePagination}
      />
    </Flex>
  );
};

export default Products;
