import { Heading } from "@chakra-ui/react";
import { Carts, getCarts } from "@/components/features";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { customQuery } from "@/utils";
import type { GetServerSideProps } from "next";
import type { MainProps } from "../_app";

export const getServerSideProps: GetServerSideProps<MainProps> = async ({
  query,
}) => {
  const queryClient = new QueryClient();
  const { page: qPage, perPage: qPerPage } = query;

  const qPageValue = Number(customQuery<number>(qPage, 1));
  const qPerPageValue = Number(customQuery<number>(qPerPage, 10));

  await queryClient.prefetchQuery(
    [
      "carts",
      {
        skip: (Number(qPageValue) - 1) * Number(qPerPageValue),
        limit: Number(qPerPageValue),
      },
    ],
    async () =>
      await getCarts({
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

const CartsPage = () => {
  return (
    <>
      <Heading size="lg" mb={10}>
        Carts
      </Heading>
      <Carts />
    </>
  );
};

export default CartsPage;
