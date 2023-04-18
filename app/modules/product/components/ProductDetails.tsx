import { useLoaderData } from "@remix-run/react";
import {
  SfButton,
  SfCounter,
  SfIconAdd,
  SfIconCompareArrows,
  SfIconFavorite,
  SfIconPackage,
  SfIconRemove,
  SfIconSafetyCheck,
  SfIconSell,
  SfIconWarehouse,
  SfLink,
  SfRating,
} from "@storefront-ui/react";
import { clamp } from "@storefront-ui/shared";
import { IconShoppingCart } from "@tabler/icons-react";
import type { ChangeEvent } from "react";
import { useId } from "react";
import { useCounter } from "react-use";
import type { loader } from "~/routes/$";

export default function ProductDetails() {
  const { product } = useLoaderData<typeof loader>();

  const inputId = useId();
  const min = 1;
  const max = 999;
  const [value, { inc, dec, set }] = useCounter(min);
  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { value: currentValue } = event.target;
    const nextValue = parseFloat(currentValue);
    set(Number(clamp(nextValue, min, max)));
  }
  return (
    <section className="md:max-w-[640px]">
      {product.on_sale && (
        <div className="mb-4 inline-flex items-center justify-center bg-secondary-600 px-3 py-1.5 text-sm font-medium text-white">
          <SfIconSell size="sm" className="mr-1.5" />
          Sale
        </div>
      )}

      <h1
        className="mb-1 font-bold sf-headline-2"
        dangerouslySetInnerHTML={{ __html: product.name }}
      ></h1>
      <div
        className="mt-2 block font-bold text-primary-600 sf-headline-3"
        dangerouslySetInnerHTML={{ __html: product.price_html }}
      ></div>
      <div className="mb-4 mt-4 inline-flex items-center">
        <SfRating size="xs" value={product.average_rating} max={5} />
        <SfCounter className="ml-1" size="xs">
          {product.average_rating}
        </SfCounter>
        <SfLink
          href="#"
          variant="secondary"
          className="ml-2 text-xs text-neutral-500"
        >
          {product.rating_count} reviews
        </SfLink>
      </div>
      <ul className="sf-text-md mb-4 font-normal">
        {product.attributes
          .filter((s) => !s.variation)
          .map((attr) => (
            <li key={attr.id} className="mb-2">
              <span>{attr.name}: </span>
              <span>{attr.options.join(", ")}</span>
            </li>
          ))}
      </ul>

      <div className="mb-4 ">
        <div className="mb-2 w-full text-gray-700 sf-headline-5">
          Chọn kích thước
        </div>
        <div className="flex flex-wrap gap-4">
          {product.attributes
            .find((a) => a.name === "size")
            ?.options.map((o) => (
              <SfButton
                key={o}
                variant="tertiary"
                className="border border-gray-200 px-5 font-normal sf-text-sm hover:border-primary-600"
              >
                {o}
              </SfButton>
            ))}
        </div>
      </div>
      <div className="mb-4 border-y border-gray-200 py-4">
        {/* <div className="typography-text-sm mb-4 flex items-center justify-center gap-1.5 rounded-md bg-primary-100 py-1.5 text-primary-700">
          <SfIconShoppingCartCheckout /> {}
        </div> */}
        <div className="items-start sm:flex ">
          <div className="mb-2 flex flex-col items-stretch xs:inline-flex xs:items-center sm:mb-0">
            <div className="flex rounded-md border border-neutral-300">
              <SfButton
                type="button"
                variant="tertiary"
                square
                className="rounded-r-none p-3"
                disabled={value <= min}
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
                value={value}
                onChange={handleOnChange}
              />
              <SfButton
                type="button"
                variant="tertiary"
                square
                className="rounded-l-none p-3"
                disabled={value >= max}
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
          >
            Thêm vào giỏ hàng
          </SfButton>
        </div>
        <div className="mt-4 flex justify-center gap-x-4">
          <SfButton
            type="button"
            size="sm"
            variant="tertiary"
            slotPrefix={<SfIconCompareArrows size="sm" />}
          >
            Compare
          </SfButton>
          <SfButton
            type="button"
            size="sm"
            variant="tertiary"
            slotPrefix={<SfIconFavorite size="sm" />}
          >
            Add to list
          </SfButton>
        </div>
      </div>
      <div className="flex first:mt-4">
        <SfIconPackage
          size="sm"
          className="mr-1 flex-shrink-0 text-neutral-500"
        />
        <p className="text-sm">
          Free shipping, arrives by Thu, Apr 7. Want it faster?
          <SfLink href="#" variant="secondary" className="mx-1">
            Add an address
          </SfLink>
          to see options
        </p>
      </div>
      <div className="mt-4 flex">
        <SfIconWarehouse
          size="sm"
          className="mr-1 flex-shrink-0 text-neutral-500"
        />
        <p className="text-sm">
          Pickup not available at your shop.
          <SfLink href="#" variant="secondary" className="ml-1">
            Check availability nearby
          </SfLink>
        </p>
      </div>
      <div className="mt-4 flex">
        <SfIconSafetyCheck
          size="sm"
          className="mr-1 flex-shrink-0 text-neutral-500"
        />
        <p className="text-sm">
          Free 30-days returns.
          <SfLink href="#" variant="secondary" className="ml-1">
            Details
          </SfLink>
        </p>
      </div>
      <div className="mt-4"></div>
    </section>
  );
}
