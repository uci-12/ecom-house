import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Box,
} from "@chakra-ui/react";
import type { CartProductMapped } from "@/types";

type CartProductsProps = {
  products: CartProductMapped[];
};

const TCartProductHead = () => (
  <Thead backgroundColor="teal.500">
    <Tr>
      <Th color="whiteAlpha.800">Product Name</Th>
      <Th color="whiteAlpha.800" isNumeric>
        Price
      </Th>
      <Th color="whiteAlpha.800" isNumeric>
        Quantity
      </Th>
      <Th color="whiteAlpha.800" isNumeric>
        Total
      </Th>
      <Th color="whiteAlpha.800" isNumeric>
        Discount %
      </Th>
      <Th color="whiteAlpha.800" isNumeric>
        Discounted
      </Th>
    </Tr>
  </Thead>
);

const TCartProductItem = ({
  title,
  price,
  quantity,
  total,
  discountPercentage,
  discountedPrice,
}: CartProductMapped) => (
  <Tr>
    <Td>{title}</Td>
    <Td isNumeric>{price}</Td>
    <Td isNumeric>${quantity}</Td>
    <Td isNumeric>{total}</Td>
    <Td isNumeric>{discountPercentage}</Td>
    <Td isNumeric>{discountedPrice}</Td>
  </Tr>
);

export const CartProductsTable = ({ products }: CartProductsProps) => (
  <Box>
    <Heading size="md" mb={4}>
      Products
    </Heading>
    <TableContainer
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="base"
    >
      <Table variant="simple" colorScheme="teal">
        <TableCaption mt={1}>Product List</TableCaption>
        <TCartProductHead />
        <Tbody>
          {products?.map((product: CartProductMapped) => (
            <TCartProductItem key={product.id} {...product} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
);
