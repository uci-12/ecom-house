import { Heading, Box, Flex, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { ArrowLeft } from "react-feather";
import { CartCard, CartProductsTable } from "@/components/features";
import type { CartDetailProps } from "@/types";

export function Cart({ cart, user }: CartDetailProps) {
  const cartCardProps = {
    name: user.name,
    ofItems: cart.totalQuantity,
    totalAmount: cart.total,
    discountedAmount: cart.discountedTotal,
  };
  return (
    <Flex gap={2} direction="column">
      <Box width="fit-content">
        <Link href="/carts">
          <Flex
            gap={2}
            align="center"
            textColor="gray.500"
            fontWeight="semibold"
            fontSize="sm"
          >
            <ArrowLeft size={20} color="gray" />
            Back
          </Flex>
        </Link>
      </Box>
      <VStack spacing={10} align="normal">
        <Heading size="lg">Cart {cart.id}</Heading>
        <CartCard {...cartCardProps} />
        <CartProductsTable products={cart.products} />
      </VStack>
    </Flex>
  );
}
