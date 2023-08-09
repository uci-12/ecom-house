import {
  Table,
  Skeleton,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
} from "@chakra-ui/react";

const TemplateSekeleton = () => (
  <Skeleton
    startColor="teal.400"
    endColor="teal.800"
    height="20px"
    width="150px"
  />
);

const TProductHead = () => (
  <Thead backgroundColor="teal.500">
    <Tr>
      <Th>
        <TemplateSekeleton />
      </Th>
      <Th>
        <TemplateSekeleton />
      </Th>
      <Th>
        <TemplateSekeleton />
      </Th>
      <Th>
        <TemplateSekeleton />
      </Th>
      <Th>
        <TemplateSekeleton />
      </Th>
    </Tr>
  </Thead>
);

const TProductItem = () => (
  <Tr>
    <Td>
      <TemplateSekeleton />
    </Td>
    <Td>
      <TemplateSekeleton />
    </Td>
    <Td>
      <TemplateSekeleton />
    </Td>
    <Td>
      <TemplateSekeleton />
    </Td>
    <Td>
      <TemplateSekeleton />
    </Td>
  </Tr>
);

const TableSkeleton = () => (
  <TableContainer borderWidth="1px" borderColor="gray.100" borderRadius="base">
    <Table variant="simple" colorScheme="teal">
      <TProductHead />
      <Tbody>
        {Array.from({ length: 10 }, (_, i) => (
          <TProductItem key={i} />
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export { TableSkeleton };
