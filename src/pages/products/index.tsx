import { Heading, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  ProductsTable,
  useGetProducts,
  useProductsReducer,
} from "@/components/modules/Product";
import Pagination from "@/components/modules/Pagination";
import { TableSkeleton } from "@/components/modules/Skeleton";
import { customQuery } from "@/utils";
import { useDebounce } from "@/hooks";
import { SET_PAGINATION } from "@/constants";

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
      brandName: qBrandValue,
      categoryName: qCategoryValue,
    },
    search: qSearchValue,
    priceRange: [qMinPriceValue, qMaxPriceValue],
  });

  const { page, perPage } = state.pagination;
  const { brandName, categoryName } = state.filter;
  const [minPrice, maxPrice] = state.priceRange;
  const searchProductValue = state.search;

  const debouncedSearchProduct = useDebounce(searchProductValue ?? "", 1000);

  const {
    data: products,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetProducts({
    brand: brandName,
    category: categoryName,
    limit: perPage,
    minPrice,
    maxPrice,
    q: debouncedSearchProduct,
    skip: (page - 1) * perPage,
    select: "title,price,stock,brand,category",
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

  return (
    <>
      <Heading size="lg" mb={10}>
        Products
      </Heading>
      <Flex flexDirection="column" gap={3}>
        {isLoading || isFetching ? (
          <TableSkeleton />
        ) : isSuccess && products?.products ? (
          <ProductsTable products={products.products} />
        ) : null}
        <Pagination
          currentPage={page}
          perPage={perPage}
          total={products?.total ?? 0}
          onChange={onChangePagination}
        />
      </Flex>
    </>
  );
};

export default Products;
