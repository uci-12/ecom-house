import { Flex, Box, IconButton, Text, HStack } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "react-feather";

type PaginationProps = {
  currentPage: number;
  perPage: number;
  total: number;
  onChange: (page: number, perPage: number) => void;
};

const Pagination = ({
  currentPage,
  perPage,
  total,
  onChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / perPage);
  const handlePreviousPage = () =>
    currentPage > 1 && onChange(currentPage - 1, perPage);
  const handleNextPage = () =>
    currentPage < totalPages && onChange(currentPage + 1, perPage);

  return (
    <Flex flexWrap="wrap" gap={3} justify="center">
      <Box>
        <IconButton
          icon={<ChevronLeft />}
          aria-label="Previous Page"
          colorScheme="teal"
          isDisabled={currentPage === 1}
          onClick={handlePreviousPage}
        />
      </Box>
      <HStack spacing={1}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Box
            key={page}
            px={2}
            py={1}
            background={currentPage === page ? "teal.500" : "white"}
            color={currentPage === page ? "white" : "black"}
            onClick={() => onChange(page, perPage)}
            cursor="pointer"
            borderRadius="lg"
            display="inline-block"
          >
            <Text>{page}</Text>
          </Box>
        ))}
      </HStack>
      <Box>
        <IconButton
          icon={<ChevronRight />}
          aria-label="Next Page"
          colorScheme="teal"
          isDisabled={currentPage === totalPages}
          onClick={handleNextPage}
        />
      </Box>
    </Flex>
  );
};

export default Pagination;
