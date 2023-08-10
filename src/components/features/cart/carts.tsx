import { useState } from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { TableSkeleton, Pagination } from "@/components/user-interfaces";
import { CartsTable, useGetCarts } from ".";

type Pagination = {
  page: number;
  perPage: number;
};

export function Carts() {
  const router = useRouter();
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 10,
  });
  const { page, perPage } = pagination;

  const {
    data: carts,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetCarts({
    limit: perPage,
    skip: (page - 1) * perPage,
  });

  const onChangePagination = (page: number, perPage: number) => {
    setPagination((currState) => ({ ...currState, page, perPage }));
    router.push(
      {
        pathname: router.pathname,
        query: {
          page,
          perPage,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <Flex flexDirection="column" gap={5}>
      {isLoading || isFetching ? (
        <TableSkeleton />
      ) : isSuccess && carts?.carts ? (
        <CartsTable carts={carts.carts} />
      ) : null}
      <Pagination
        currentPage={page}
        perPage={perPage}
        total={carts?.total ?? 0}
        onChange={onChangePagination}
      />
    </Flex>
  );
}
