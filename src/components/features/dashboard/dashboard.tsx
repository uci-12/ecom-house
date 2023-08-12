import { Stack } from "@chakra-ui/react";
import {
  useGetProducts,
  ChartProductsByBrand,
  ChartProductsByCategory,
} from "@/components/features";
import { Spinner } from "@/components/user-interfaces";

export function Dashboard() {
  const {
    data: products,
    isLoading: isProductsLoading,
    isSuccess: isProductsSuccess,
  } = useGetProducts({
    limit: 100,
  });

  return (
    <>
      <Spinner isLoading={isProductsLoading}>
        {isProductsSuccess && (
          <Stack
            spacing={5}
            width="full"
            justify="space-between"
            direction={{ base: "column", md: "column", lg: "row" }}
          >
            <ChartProductsByBrand products={products?.products} />
            <ChartProductsByCategory products={products?.products} />
          </Stack>
        )}
      </Spinner>
    </>
  );
}
