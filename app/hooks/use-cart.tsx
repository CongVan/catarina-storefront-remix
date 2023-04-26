import { produce } from "immer";
import type { ReactNode } from "react";
import { useEffect } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import type { UseMutateFunction } from "react-query";
import { useMutation } from "react-query";
import { useTheme } from "~/hooks/use-theme";
import { CommerceAPI } from "~/modules/api/commerce";
import type { Product } from "~/types/product";
import type { ProductVariant } from "~/types/product-variations";
import type { Customer } from "~/types/user";

export type Line = {
  key: string;
  productName: Pick<Product, "name">["name"];
  productImage: string;
  productId: Pick<Product, "id">["id"];
  variantId: Pick<ProductVariant, "id">["id"];
  attributes: Pick<ProductVariant, "attributes">["attributes"];
  price: string;
  sale_price: string;
  regular_price: string;
  quantity: number;
};

type State = {
  lines: Line[];
  count: number;
  subTotal?: number;
  total?: number;
  shippingFee?: number;
  discount?: number;
  isLoading?: boolean;
};

enum ActionType {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
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
      type: ActionType.UPDATE_QUANTITY;
      payload: Parameters<Action["updateQuantity"]>[0];
    }
  | { type: ActionType.CLEAR_CART };

type Action = {
  addToCart: (params: {
    product: Product;
    variant: ProductVariant;
    quantity: number;
  }) => void;
  removeFromCart: (params: {
    productId: Pick<Product, "id">["id"];
    variantId: Pick<ProductVariant, "id">["id"];
  }) => void;
  updateQuantity: (params: {
    productId: Pick<Product, "id">["id"];
    variantId: Pick<ProductVariant, "id">["id"];
    quantity: number;
  }) => void;

  saveCart: UseMutateFunction<
    {
      data: Customer;
    },
    unknown,
    void,
    unknown
  >;
  clear: () => void;
};

type CartState = State & Action;

const initialState: CartState = {
  lines: [],
  count: 0,
  addToCart() {},
  updateQuantity() {},
  removeFromCart() {},
  saveCart() {},
  clear() {},
};

const CartContext = createContext<CartState>(initialState);
const product2Line = ({
  product,
  variant,
  quantity,
}: Parameters<Action["addToCart"]>[0]) => {
  return {
    key: getCartMetaKey(product.id, variant.id),
    productId: product.id,
    productImage: product.images[0].src,
    productName: product.name,
    variantId: variant.id,
    price: variant.price,
    sale_price: variant.sale_price,
    regular_price: variant.regular_price,
    attributes: variant.attributes,
    quantity,
  };
};
const getIndexProductInCart = (lines: State["lines"], productId, variantId) => {
  return lines.findIndex(
    (line) => line.productId === productId && line.variantId === variantId
  );
};
const CART_META_KEY = "cart-line";

export const getCartMetaKey = (productId, variantId) => {
  return `${CART_META_KEY}-${productId}-${variantId}`;
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
          s.lines.push(product2Line({ product, variant, quantity }));
        }
      });
    }

    case ActionType.REMOVE_FROM_CART: {
      const { variantId, productId } = action.payload;

      return produce(state, (s) => {
        s.lines = s.lines.filter(
          (f) => f.productId !== productId && f.variantId !== variantId
        );
      });
    }
    case ActionType.UPDATE_QUANTITY: {
      const { variantId, productId, quantity } = action.payload;

      const productIndex = getIndexProductInCart(
        state.lines,
        productId,
        variantId
      );

      return produce(state, (s) => {
        if (productIndex > -1) {
          s.lines[productIndex].quantity = quantity;
        } else {
          throw new Error("not found product in lines of cart");
        }
      });
    }
    case ActionType.CLEAR_CART: {
      return produce(state, (s) => {
        s.lines = [];
        s.count = 0;
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

const initState = ({ customer }: { customer?: Customer | null }): State => {
  const defaultState = {
    lines: [],
    count: 0,
  };
  if (!customer) return defaultState;
  const linesData = customer.meta_data.filter((s) =>
    s.key.startsWith(CART_META_KEY)
  );
  if (!linesData) {
    return defaultState;
  }
  const lines = Object.values(linesData)
    .map((line) => {
      let json;
      try {
        json = JSON.parse(line.value);
      } catch (error) {
        json = null;
      }
      return json;
    })
    .filter(Boolean);
  return {
    ...defaultState,
    lines,
  };
};
export const CartProvider = ({ children, customer }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, { customer }, initState);
  const { toggleCartModal } = useTheme();

  const { mutate: saveCart, isLoading } = useMutation(async (data: any) => {
    return await CommerceAPI.customers.update(customer?.id, {
      meta_data: [
        {
          key: data.key,
          value: data.value,
        },
      ],
    });
  });

  const addToCart = useCallback(
    async (payload: Parameters<Action["addToCart"]>[0]) => {
      const { product, variant, quantity } = payload;
      const productIndex = getIndexProductInCart(
        state.lines,
        product.id,
        variant.id
      );
      const newQuantity =
        productIndex > -1
          ? quantity + state.lines[productIndex].quantity
          : quantity;
      await saveCart(
        {
          key: getCartMetaKey(product.id, variant.id),
          value: JSON.stringify(
            product2Line({ product, variant, quantity: newQuantity })
          ),
        },
        {
          onSuccess: () => {
            dispatch({ type: ActionType.ADD_TO_CART, payload: payload });
            toggleCartModal(true);
          },
        }
      );
    },
    [saveCart, toggleCartModal, state.lines]
  );

  const removeFromCart = useCallback(
    (payload: Parameters<Action["removeFromCart"]>[0]) => {
      saveCart(
        {
          key: getCartMetaKey(payload.productId, payload.variantId),
        },
        {
          onSuccess: () => {
            dispatch({ type: ActionType.REMOVE_FROM_CART, payload: payload });
          },
        }
      );
    },
    [saveCart]
  );

  const updateQuantity = useCallback(
    (payload: Parameters<Action["updateQuantity"]>[0]) => {
      const line = state.lines.find(
        (l) =>
          l.productId === payload.productId && l.variantId === payload.variantId
      );
      if (!line) {
        throw new Error("Not found line in cart");
      }
      saveCart({
        key: getCartMetaKey(payload.productId, payload.variantId),
        value: JSON.stringify({ ...line, quantity: payload.quantity }),
      });
      dispatch({ type: ActionType.UPDATE_QUANTITY, payload: payload });
    },
    [saveCart, state.lines]
  );

  const clear = useCallback(() => {
    dispatch({ type: ActionType.CLEAR_CART });
  }, []);
  const value = useMemo(() => {
    return {
      ...state,
      count: state.lines.length,
      isLoading,
      addToCart,
      removeFromCart,
      updateQuantity,
      saveCart,
      clear,
    };
  }, [
    state,
    isLoading,
    addToCart,
    removeFromCart,
    saveCart,
    updateQuantity,
    clear,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be use in cart context");
  }
  return context;
};
