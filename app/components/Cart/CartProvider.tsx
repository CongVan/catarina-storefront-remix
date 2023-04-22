import { produce } from "immer";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { useMutation } from "react-query";
import { CommerceAPI } from "~/modules/api/commerce";
import type { Product } from "~/types/product";
import type { ProductVariant } from "~/types/product-variations";
import type { Customer } from "~/types/user";

export type Line = {
  productName: Pick<Product, "name">["name"];
  productImage: string;
  productId: Pick<Product, "id">["id"];
  variantId: Pick<ProductVariant, "id">["id"];
  attributes: Pick<ProductVariant, "attributes">["attributes"];
  price: number;
  quantity: number;
};

type State = {
  lines: Line[];
  count: number;
};

enum ActionType {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
}

type ActionProps =
  | {
      type: ActionType.ADD_TO_CART;
      payload: Parameters<Action["addToCart"]>[0];
    }
  | {
      type: ActionType.REMOVE_FROM_CART;
      payload: Parameters<Action["removeFromCart"]>[0];
    }
  | {
      type: ActionType.INCREASE_QUANTITY;
      payload: Parameters<Action["increaseQuantity"]>[0];
    }
  | {
      type: ActionType.DECREASE_QUANTITY;
      payload: Parameters<Action["decreaseQuantity"]>[0];
    };

type Action = {
  addToCart: (params: {
    product: Product;
    variant: ProductVariant;
    quantity: number;
  }) => void;
  removeFromCart: (params: {
    productId: Pick<Product, "id">;
    variantId: Pick<ProductVariant, "id">;
  }) => void;
  increaseQuantity: (params: {
    productId: Pick<Product, "id">;
    variantId: Pick<ProductVariant, "id">;
  }) => void;
  decreaseQuantity: (params: {
    productId: Pick<Product, "id">;
    variantId: Pick<ProductVariant, "id">;
  }) => void;
};

type CartState = State & Action;

const initialState: CartState = {
  lines: [],
  count: 0,
  addToCart() {},
  increaseQuantity() {},
  decreaseQuantity() {},
  removeFromCart() {},
};

const CartContext = createContext<CartState>(initialState);

const getIndexProductInCart = (lines: State["lines"], productId, variantId) => {
  return lines.findIndex(
    (line) => line.productId === productId && line.variantId === variantId
  );
};

const cartReducer = (state: State, action: ActionProps) => {
  switch (action.type) {
    case ActionType.ADD_TO_CART: {
      const { product, variant, quantity } = action.payload;

      const productIndex = getIndexProductInCart(
        state.lines,
        product.id,
        variant.id
      );

      return produce(state, (s) => {
        if (productIndex > -1) {
          s.lines[productIndex].quantity += quantity;
        } else {
          s.lines.push({
            productId: product.id,
            productImage: product.images[0].src,
            productName: product.name,
            variantId: variant.id,
            price: +variant.price,
            attributes: variant.attributes,
            quantity,
          });
        }
      });
    }

    case ActionType.REMOVE_FROM_CART: {
      const { variantId, productId } = action.payload;

      const productIndex = getIndexProductInCart(
        state.lines,
        productId,
        variantId
      );

      return produce(state, (s) => {
        if (productIndex > -1) {
          delete state.lines[productIndex];
        } else {
          throw new Error("not found product in lines of cart");
        }
      });
    }
    case ActionType.INCREASE_QUANTITY: {
      const { variantId, productId } = action.payload;

      const productIndex = getIndexProductInCart(
        state.lines,
        productId,
        variantId
      );

      return produce(state, (s) => {
        if (productIndex > -1) {
          state.lines[productIndex].quantity++;
        } else {
          throw new Error("not found product in lines of cart");
        }
      });
    }

    case ActionType.DECREASE_QUANTITY: {
      const { variantId, productId } = action.payload;

      const productIndex = getIndexProductInCart(
        state.lines,
        productId,
        variantId
      );

      return produce(state, (s) => {
        if (productIndex > -1) {
          state.lines[productIndex].quantity--;
        } else {
          throw new Error("not found product in lines of cart");
        }
      });
    }
    default:
      return state;
  }
};
type CartProviderProps = {
  children?: ReactNode;
  customer?: Customer | null;
};
const CART_META_KEY = "cart";

const initState = ({ customer }: { customer?: Customer | null }): State => {
  const defaultState = {
    lines: [],
    count: 0,
  };
  if (!customer) return defaultState;
  const cartMetaData = customer.meta_data.find((s) => s.key === CART_META_KEY);
  if (!cartMetaData) {
    return defaultState;
  }
  const lines = JSON.parse(cartMetaData.value);
  return {
    ...defaultState,
    lines,
  };
};
export const CartProvider = ({ children, customer }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, { customer }, initState);

  // const a = useMutation('/update-cart', async () => CommerceAPI.customers.update())

  const addToCart = useCallback(
    (payload: Parameters<Action["addToCart"]>[0]) => {
      dispatch({ type: ActionType.ADD_TO_CART, payload: payload });
    },
    []
  );

  const removeFromCart = useCallback(
    (payload: Parameters<Action["removeFromCart"]>[0]) => {
      dispatch({ type: ActionType.REMOVE_FROM_CART, payload: payload });
    },
    []
  );

  const increaseQuantity = useCallback(
    (payload: Parameters<Action["removeFromCart"]>[0]) => {
      dispatch({ type: ActionType.INCREASE_QUANTITY, payload: payload });
    },
    []
  );

  const decreaseQuantity = useCallback(
    (payload: Parameters<Action["decreaseQuantity"]>[0]) => {
      dispatch({ type: ActionType.DECREASE_QUANTITY, payload: payload });
    },
    []
  );

  const value = useMemo(() => {
    return {
      ...state,
      count: state.lines.length,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
    };
  }, [state, addToCart, removeFromCart, increaseQuantity, decreaseQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be use in cart context");
  }
  return context;
};
