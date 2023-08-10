import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import type { ProductMapped } from "@/types";

type ProductsProps = {
  products: ProductMapped[];
};

const TProductHead = () => (
  <Thead backgroundColor="teal.500">
    <Tr>
      <Th color="whiteAlpha.800">Product Name</Th>
      <Th color="whiteAlpha.800">Brand</Th>
      <Th color="whiteAlpha.800" isNumeric>
        Price
      </Th>
      <Th color="whiteAlpha.800" isNumeric>
        Stock
      </Th>
      <Th color="whiteAlpha.800">Category</Th>
    </Tr>
  </Thead>
);

const TProductItem = ({
  title,
  brand,
  price,
  stock,
  category,
}: ProductMapped) => (
  <Tr>
    <Td>{title}</Td>
    <Td>{brand}</Td>
    <Td isNumeric>${price}</Td>
    <Td isNumeric>{stock}</Td>
    <Td>{category}</Td>
  </Tr>
);

export const ProductsTable = ({ products }: ProductsProps) => (
  <TableContainer borderWidth="1px" borderColor="gray.100" borderRadius="base">
    <Table variant="simple" colorScheme="teal">
      <TableCaption mt={1}>Product List</TableCaption>
      <TProductHead />
      <Tbody>
        {products?.map((product: ProductMapped) => (
          <TProductItem key={product.id} {...product} />
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);
