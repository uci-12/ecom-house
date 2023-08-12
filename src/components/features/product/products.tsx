import { useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import {
  ProductsTable,
  useGetProducts,
  useProductsReducer,
  useGetProductsCategories,
  ProductsFilter,
  useGetProductsBrands,
} from "@/components/features";
import { TableSkeleton, Pagination } from "@/components/user-interfaces";
import { customQuery } from "@/utils";
import { useDebounce } from "@/hooks";
import {
  SET_PAGINATION,
  SET_FILTER,
  SET_PRICE_RANGE,
  SET_SEARCH,
} from "@/constants";
import type { ParsedUrlQuery } from "querystring";

export function Products() {
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

  useEffect(() => {
    const {
      brand,
      category,
      minPrice,
      maxPrice,
      q,
      page: qPage,
      perPage: qPerPage,
    } = router.query;

    dispatch({
      type: SET_FILTER,
      payload: {
        brand: brand ? `${brand}` : undefined,
        category: category ? `${category}` : undefined,
      },
    });
    dispatch({
      type: SET_PRICE_RANGE,
      payload: [
        Number(customQuery<number>(minPrice, 0)),
        Number(customQuery<number>(maxPrice, 0)),
      ],
    });
    dispatch({ type: SET_SEARCH, payload: q ? `${q}` : "" });
    dispatch({
      type: SET_PAGINATION,
      payload: {
        page: Number(customQuery<number>(qPage, 1)),
        perPage: Number(customQuery<number>(qPerPage, 10)),
      },
    });
  }, [dispatch, router.query]);

  const { page, perPage } = state.pagination;
  const { brand, category } = state.filter;
  const [minPrice, maxPrice] = state.priceRange;
  const searchProductValue = state.search;

  const debouncedSearchProduct = useDebounce(searchProductValue ?? "", 1000);

  const {
    data: products,
    isLoading: isProductsLoading,
    isSuccess: isProductsSuccess,
  } = useGetProducts({
    brand,
    category,
    limit: perPage,
    minPrice,
    maxPrice,
    q: debouncedSearchProduct,
    skip: (page - 1) * perPage,
  });

  const { data: categories = [] } = useGetProductsCategories({
    staleTime: Infinity,
  });

  const { data: brands = [] } = useGetProductsBrands({
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

  const onChangeCategoryBrand = useCallback(
    async (value: string, name: string) => {
      await dispatch({
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
    },
    [dispatch, router, state.filter],
  );

  const onChangePriceRange = useCallback(
    async (min: number, max: number) => {
      await dispatch({
        type: SET_PRICE_RANGE,
        payload: [min, max],
      });
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            page: 1,
            minPrice: min,
            maxPrice: max,
          },
        },
        undefined,
        { shallow: true },
      );
    },
    [dispatch, router],
  );

  const onChangeSearchProductName = useCallback(
    async (value: string) => {
      await dispatch({
        type: SET_SEARCH,
        payload: value,
      });
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            q: value,
          },
        },
        undefined,
        { shallow: true },
      );
    },
    [dispatch, router],
  );

  const productsFilter = useMemo(
    () => (
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
        onChangeCategoryBrand={onChangeCategoryBrand}
        onChangePriceRange={onChangePriceRange}
        onChangeSearchProductName={onChangeSearchProductName}
      />
    ),
    [
      brand,
      brands,
      categories,
      category,
      maxPrice,
      minPrice,
      onChangeCategoryBrand,
      onChangePriceRange,
      onChangeSearchProductName,
      searchProductValue,
    ],
  );

  // useEffect(() => {
  //   if (qBrand !== undefined || qCategory !== undefined) {
  //     dispatch({
  //       type: SET_FILTER,
  //       payload: {
  //         brand: qBrand !== undefined ? String(qBrand) : undefined,
  //         category: qCategory !== undefined ? String(qCategory) : undefined,
  //       },
  //     });
  //   }

  //   if (qMinPrice !== undefined && qMaxPrice !== undefined) {
  //     dispatch({
  //       type: SET_PRICE_RANGE,
  //       payload: [Number(qMinPrice), Number(qMaxPrice)],
  //     });
  //   }

  //   if (qSearch !== undefined) {
  //     dispatch({ type: SET_SEARCH, payload: String(qSearch) });
  //   }

  //   if (qPage !== undefined) {
  //     dispatch({
  //       type: SET_PAGINATION,
  //       payload: {
  //         page: Number(customQuery<number>(qPage, 1)),
  //         perPage: Number(customQuery<number>(qPerPage, 10)),
  //       },
  //     });
  //   }
  // }, [
  //   dispatch,
  //   qBrand,
  //   qCategory,
  //   qMaxPrice,
  //   qMinPrice,
  //   qPage,
  //   qPerPage,
  //   qSearch,
  // ]);

  return (
    <Flex flexDirection="column" gap={5}>
      {productsFilter}
      {isProductsLoading ? (
        <TableSkeleton />
      ) : isProductsSuccess && products?.products ? (
        <ProductsTable products={products.products} />
      ) : null}
      {products?.total && products.total > 0 ? (
        <Pagination
          currentPage={page}
          perPage={perPage}
          total={products?.total ?? 0}
          onChange={onChangePagination}
        />
      ) : null}
    </Flex>
  );
}
