import { Heading } from "@chakra-ui/react";
import { Carts } from "@/components/features";

const CartsPage = () => {
  return (
    <>
      <Heading size="lg" mb={10}>
        Carts
      </Heading>
      <Carts />
    </>
  );
};

export default CartsPage;
