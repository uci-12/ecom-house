import Link from "next/link";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { Eye } from "react-feather";
import type { Cart } from "@/types";

type CartsProps = {
  carts: Cart[];
};

const TCartHead = () => (
  <Thead backgroundColor="teal.500">
    <Tr>
      <Th color="whiteAlpha.800" isNumeric>
        User ID
      </Th>
      <Th color="whiteAlpha.800" isNumeric>
        Total Products
      </Th>
      <Th color="whiteAlpha.800" isNumeric>
        Total Quantity
      </Th>
      <Th color="whiteAlpha.800" isNumeric>
        Discounted Total
      </Th>
      <Th color="whiteAlpha.800" textAlign="center">
        Action
      </Th>
    </Tr>
  </Thead>
);

const TCartItem = (props: Cart) => (
  <Tr>
    <Td isNumeric>{props.userId}</Td>
    <Td isNumeric>{props.totalProducts}</Td>
    <Td isNumeric>{props.totalQuantity}</Td>
    <Td isNumeric>{props.discountedTotal}</Td>
    <Td textAlign="center">
      <Link href={`/carts/${props.id}`}>
        <IconButton
          isRound
          variant="solid"
          icon={<Eye size={20} />}
          aria-label="Cart Detail"
          color="teal.600"
        />
      </Link>
    </Td>
  </Tr>
);

export const CartsTable = ({ carts }: CartsProps) => (
  <TableContainer borderWidth="1px" borderColor="gray.100" borderRadius="base">
    <Table variant="simple" colorScheme="teal">
      <TableCaption mt={1}>Cart List</TableCaption>
      <TCartHead />
      <Tbody>
        {carts?.map((cart: Cart) => <TCartItem key={cart.id} {...cart} />)}
      </Tbody>
    </Table>
  </TableContainer>
);
