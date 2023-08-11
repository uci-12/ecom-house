import { Card, CardBody, Box, Heading, VStack, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

const TextHeader = styled(Text)`
  font-family: mono;
  color: #000000a3;
  font-size: 12px;
`;

type CartCardProps = {
  name: string;
  ofItems: number;
  totalAmount: number;
  discountedAmount: number;
};

export function CartCard({
  name,
  ofItems,
  totalAmount,
  discountedAmount,
}: CartCardProps) {
  return (
    <Box>
      <Heading size="md" mb={4}>
        Details
      </Heading>
      <Card>
        <CardBody display="flex" py={3}>
          <VStack align="normal" spacing={4} width="full" fontWeight="semibold">
            <VStack align="normal" spacing={0.5}>
              <TextHeader>USER</TextHeader>
              <Text>{name.toUpperCase()}</Text>
            </VStack>
            <VStack align="normal" spacing={0.5}>
              <TextHeader># OF ITEMS</TextHeader>
              <Text>{ofItems}</Text>
            </VStack>
          </VStack>
          <VStack align="normal" spacing={4} width="full" fontWeight="semibold">
            <VStack align="normal" spacing={0.5}>
              <TextHeader>TOTAL AMOUNT</TextHeader>
              <Text>{totalAmount}</Text>
            </VStack>
            <VStack align="normal" spacing={0.5}>
              <TextHeader>DISCOUNTED AMOUNT</TextHeader>
              <Text>{discountedAmount}</Text>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
