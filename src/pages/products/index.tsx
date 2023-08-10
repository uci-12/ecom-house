import { Heading } from "@chakra-ui/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Products } from "@/components/features";
import { customQuery } from "@/utils";
import { getProducts } from "@/components/features/product/endpoint";
import type { GetServerSideProps } from "next";
import type { MainProps } from "../_app";

export const getServerSideProps: GetServerSideProps<MainProps> = async ({
  query,
}) => {
  const queryClient = new QueryClient();
  const {
    brand: qBrand,
    category: qCategory,
    minPrice: qMinPrice,
    maxPrice: qMaxPrice,
    page: qPage,
    perPage: qPerPage,
    q: qSearch,
  } = query;

  const qBrandValue = customQuery<string>(qBrand, "");
  const qCategoryValue = customQuery<string>(qCategory, "");
  const qMinPriceValue = Number(customQuery<number>(qMinPrice, 0));
  const qMaxPriceValue = Number(customQuery<number>(qMaxPrice, 0));
  const qPageValue = Number(customQuery<number>(qPage, 1));
  const qPerPageValue = Number(customQuery<number>(qPerPage, 10));
  const qSearchValue = customQuery<string>(qSearch, "");

  await queryClient.prefetchQuery(
    [
      "products",
      {
        brand: qBrandValue,
        category: qCategoryValue,
        minPrice: Number(qMinPriceValue),
        maxPrice: Number(qMaxPriceValue),
        q: qSearchValue,
        skip: (Number(qPageValue) - 1) * Number(qPerPageValue),
        limit: Number(qPerPageValue),
      },
    ],
    () =>
      getProducts({
        brand: qBrandValue,
        category: qCategoryValue,
        minPrice: Number(qMinPriceValue),
        maxPrice: Number(qMaxPriceValue),
        q: qSearchValue,
        skip: (Number(qPageValue) - 1) * Number(qPerPageValue),
        limit: Number(qPerPageValue),
      }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ProductsPage = () => {
  return (
    <>
      <Heading size="lg" mb={10}>
        Products
      </Heading>
      <Products />
    </>
  );
};

export default ProductsPage;
