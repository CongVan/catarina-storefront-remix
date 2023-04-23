import {
  SfLink,
  SfButton,
  SfIconRemove,
  SfIconAdd,
} from "@storefront-ui/react";
import { IconX } from "@tabler/icons-react";
import { min, max, clamp } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { useId } from "react";
import { useCounter, useDebounce } from "react-use";
import { twMerge } from "tailwind-merge";
import type { Line } from "~/hooks/use-cart";
import { useCart } from "~/hooks/use-cart";
import { formatCurrency } from "~/utils/currency";

export const ProductCartItemCard: React.FC<{ line: Line }> = ({ line }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const inputId = useId();
  const min = 1;
  const max = 10;
  const [quantity, { inc, dec, set }] = useCounter(line.quantity);
  const [debounceQuantity, setDebouncedValue] = useState(line.quantity);

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(quantity);
    },
    500,
    [quantity]
  );

  useEffect(() => {
    if (debounceQuantity === line.quantity) return;
    updateQuantity({
      productId: line.productId,
      variantId: line.variantId,
      quantity: debounceQuantity,
    });
  }, [debounceQuantity, updateQuantity, line]);

  const removeLineItem = () => {
    removeFromCart({ productId: line.productId, variantId: line.variantId });
  };

  return (
    <div className={twMerge("flex w-full items-start p-1", "flex-nowrap")}>
      <div className="relative w-[80px] min-w-[80px]">
        <SfLink href="#" className="">
          <img
            src={line.productImage}
            alt={line.productName + ""}
            className=" aspect-square  rounded-md object-cover"
            width={80}
            height={80}
          />
        </SfLink>
      </div>
      <div className="min-w-0 flex-1 pl-2">
        <SfLink
          href="#"
          variant="secondary"
          className="line-clamp-1 no-underline"
          dangerouslySetInnerHTML={{ __html: line.productName }}
        ></SfLink>
        <p className="text-xs text-neutral-500">
          {line.attributes.map((attr) => attr.option).join(", ")}
        </p>

        <span className="sf-text-md block py-1 font-bold">
          {formatCurrency(line.price)}
        </span>
        <div className="flex justify-between gap-2 ">
          <div className="flex h-10 rounded-md border border-neutral-300">
            <SfButton
              type="button"
              variant="tertiary"
              size="sm"
              square
              className="rounded-r-none p-1"
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
              className="[&::-webkit-inner-spin-button]:display-none [&::-webkit-outer-spin-button]:display-none mx-2 w-8 max-w-[24px] grow appearance-none bg-transparent text-center font-medium [-moz-appearance:textfield] focus-visible:rounded-sm focus-visible:outline-offset focus-visible:outline disabled:placeholder-disabled-900 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              min={min}
              max={max}
              value={quantity}
              readOnly
            />
            <SfButton
              type="button"
              size="sm"
              variant="tertiary"
              square
              className="rounded-l-none p-1"
              disabled={quantity >= max}
              aria-controls={inputId}
              aria-label="Increase value"
              onClick={() => inc()}
            >
              <SfIconAdd />
            </SfButton>
          </div>
          <SfButton
            type="button"
            size="sm"
            variant="tertiary"
            slotPrefix={<IconX className="h-6 w-6" />}
            className="h-10"
            onClick={() => removeLineItem()}
          >
            Xóa
          </SfButton>
        </div>
      </div>
    </div>
  );
};
