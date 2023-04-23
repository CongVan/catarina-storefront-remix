import {
  SfButton,
  SfIconAdd,
  SfIconRemove,
  SfLoaderLinear,
} from "@storefront-ui/react";
import { IconShoppingCart } from "@tabler/icons-react";
import { clamp } from "lodash";
import type { ChangeEvent } from "react";
import { useEffect, useId } from "react";
import { toast } from "react-hot-toast";
import { useCounter } from "react-use";
import { useCart } from "~/hooks/use-cart";

import { RequireAuth } from "~/components/RequireLogin";
import { useTheme } from "~/context/theme";
import type { Product } from "~/types/product";
import type { ProductVariant } from "~/types/product-variations";

export const AddToCartButton: React.FC<{
  variant: ProductVariant | null;
  product: Product;
}> = ({ variant, product }) => {
  const { addToCart, isLoading, lines } = useCart();

  const inputId = useId();
  const min = 1;
  const max = 10;
  const [quantity, { inc, dec, set }] = useCounter(min);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { value: currentValue } = event.target;
    const nextValue = parseFloat(currentValue);
    set(Number(clamp(nextValue, min, max)));
  }

  const onClickAddToCart = async () => {
    if (variant) {
      addToCart({ product, variant, quantity });
    } else {
      toast.error("Not found variant");
    }
  };

  useEffect(() => {
    console.log("lines", lines);
  }, [lines]);

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
      <RequireAuth>
        {({ handle }) => (
          <SfButton
            type="button"
            size="lg"
            className="relative w-full overflow-hidden font-thin uppercase xs:ml-4"
            slotPrefix={<IconShoppingCart className="h-6 w-6" />}
            disabled={variant === null || isLoading}
            onClick={() => handle(onClickAddToCart)}
          >
            {isLoading && (
              <div className="absolute left-0 h-full w-full">
                <SfLoaderLinear
                  ariaLabel="loading"
                  className="h-full w-full bg-transparent text-primary-400 opacity-40"
                  size="lg"
                />
              </div>
            )}
            {variant === null ? "Chọn kích thước" : "Thêm vào giỏ hàng"}
          </SfButton>
        )}
      </RequireAuth>
    </div>
  );
};
