import { useRouteLoaderData } from "@remix-run/react";
import { SfButton, SfIconAdd, SfIconRemove } from "@storefront-ui/react";
import { IconShoppingCart } from "@tabler/icons-react";
import { clamp } from "lodash";
import type { ChangeEvent } from "react";
import { useId } from "react";
import { toast } from "react-hot-toast";
import { useCounter } from "react-use";
import { useCart } from "~/components/Cart/CartProvider";
import { useTheme } from "~/context/theme";
import type { RootLoaderData } from "~/types/common";
import type { Product } from "~/types/product";
import type { ProductVariant } from "~/types/product-variations";

export const AddToCartButton: React.FC<{
  variant: ProductVariant | null;
  product: Product;
}> = ({ variant, product }) => {
  const { user } = useRouteLoaderData("root") as RootLoaderData;
  const { addToCart } = useCart();
  const { toggleCartModal, showLogin } = useTheme();

  const inputId = useId();
  const min = 1;
  const max = 10;
  const [quantity, { inc, dec, set }] = useCounter(min);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { value: currentValue } = event.target;
    const nextValue = parseFloat(currentValue);
    set(Number(clamp(nextValue, min, max)));
  }

  const onClickAddToCart = () => {
    if (!user) {
      toast("Vui lòng đăng nhập để sử dụng tính năng này");
      return showLogin();
    }
    if (variant) {
      addToCart({ product, variant, quantity });
      toggleCartModal(true);
    } else {
      toast.error("Not found variant");
    }
  };

  return (
    <div className="items-start sm:flex ">
      <div className="mb-2 flex flex-col items-stretch xs:inline-flex xs:items-center sm:mb-0">
        <div className="flex rounded-md border border-neutral-300">
          <SfButton
            type="button"
            variant="tertiary"
            square
            className="rounded-r-none p-3"
            disabled={quantity <= min}
            aria-controls={inputId}
            aria-label="Decrease value"
            onClick={() => dec()}
          >
            <SfIconRemove />
          </SfButton>
          <input
            id={inputId}
            type="number"
            role="spinbutton"
            className="[&::-webkit-inner-spin-button]:display-none [&::-webkit-outer-spin-button]:display-none mx-2 w-8 grow appearance-none bg-transparent text-center font-medium [-moz-appearance:textfield] focus-visible:rounded-sm focus-visible:outline-offset focus-visible:outline disabled:placeholder-disabled-900 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            min={min}
            max={max}
            value={quantity}
            onChange={handleOnChange}
          />
          <SfButton
            type="button"
            variant="tertiary"
            square
            className="rounded-l-none p-3"
            disabled={quantity >= max}
            aria-controls={inputId}
            aria-label="Increase value"
            onClick={() => inc()}
          >
            <SfIconAdd />
          </SfButton>
        </div>
        {/* <p className="mb-4 mt-1 self-center text-xs text-neutral-500 xs:mb-0">
        <strong className="text-neutral-900">{max}</strong> in stock
      </p> */}
      </div>
      <SfButton
        type="button"
        size="lg"
        className="w-full font-thin uppercase xs:ml-4"
        slotPrefix={<IconShoppingCart className="h-6 w-6" />}
        disabled={variant === null}
        onClick={onClickAddToCart}
      >
        {variant === null ? "Chọn kích thước" : "Thêm vào giỏ hàng"}
      </SfButton>
    </div>
  );
};
