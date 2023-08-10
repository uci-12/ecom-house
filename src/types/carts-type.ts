type CartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
};

type Cart = {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

type CartRespose = {
  total: number;
  carts: Cart[];
  skip: number;
  limit: number;
};

type CartRequestParams = {
  limit?: number;
  skip?: number;
};

export type { Cart, CartProduct, CartRespose, CartRequestParams };
