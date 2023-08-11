import { Heading } from "@chakra-ui/react";
import { Dashboard } from "@/components/features";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getProducts } from "@/components/features";
import type { GetServerSideProps } from "next";
import type { MainProps } from "../_app";

export const getServerSideProps: GetServerSideProps<MainProps> = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      [
        "products",
        {
          limit: 100,
        },
      ],
      async () =>
        await getProducts({
          limit: 100,
        }),
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const DashboardPage = () => {
  return (
    <>
      <Heading size="lg" mb={10}>
        Dashboard
      </Heading>
      <Dashboard />
    </>
  );
};

export default DashboardPage;
