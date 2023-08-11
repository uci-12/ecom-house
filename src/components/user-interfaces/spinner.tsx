import { ReactNode } from "react";
import { Spinner as ChakraSpinner, Box, Flex } from "@chakra-ui/react";

type SpinnerProps = {
  isLoading: boolean;
  children: ReactNode;
};

export const Spinner = ({ isLoading, children }: SpinnerProps) => (
  <Box position="relative" width="full">
    {isLoading && (
      <Flex
        position="absolute"
        top={100}
        left={0}
        right={0}
        bottom={0}
        opacity={0.5}
        background="white"
        align="center"
        justify="center"
      >
        <ChakraSpinner
          thickness="10px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal"
          size="xl"
        />
      </Flex>
    )}
    {children}
  </Box>
);
