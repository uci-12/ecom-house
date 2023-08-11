import { Cart, getCart, getUser } from "@/components/features";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { customQuery } from "@/utils";
import { CartDetailProps } from "@/types";

import type { GetServerSideProps } from "next";
import type { MainProps } from "@/pages/_app";

export const getServerSideProps: GetServerSideProps<
  MainProps & CartDetailProps
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const cartId = customQuery(query.cartId, "");

  const cart = await queryClient.fetchQuery(
    ["carts", cartId],
    async () => await getCart({ cartId }),
  );

  const user = await queryClient.fetchQuery(
    ["users", cart.userId],
    async () => await getUser({ id: `${cart.userId}` }),
  );
  const userDetail = {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
  };

  return {
    props: {
      cart,
      user: userDetail,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const CartPage = (props: CartDetailProps) => {
  return (
    <>
      <Cart {...props} />
    </>
  );
};

export default CartPage;
