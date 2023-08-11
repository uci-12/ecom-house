import { Flex } from "@chakra-ui/react";
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
          <Flex gap={5}>
            <ChartProductsByBrand products={products?.products} />
            <ChartProductsByCategory products={products?.products} />
          </Flex>
        )}
      </Spinner>
    </>
  );
}
