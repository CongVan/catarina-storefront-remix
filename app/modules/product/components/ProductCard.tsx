import type { Product } from "~/types/product";
import {
  SfButton,
  SfCounter,
  SfIconFavorite,
  SfLink,
  SfRating,
} from "@storefront-ui/react";
import { twMerge } from "tailwind-merge";

export default function ProductCard({
  images,
  name,
  attributes,
  rating_count,
  average_rating,
  price_html,
  className,
}: Product & { className?: string }) {
  const brand = attributes?.find((a) => a.name === "brand");
  const fragrants = attributes?.find((a) => a.name === "fragrants");

  return (
    <div
      className={twMerge(
        "flex flex-col rounded-md border border-neutral-200 hover:shadow-lg",
        className
      )}
    >
      <div className="relative">
        <SfLink href="#" className="p-5">
          <img
            src={images?.[0].src}
            alt="Great product"
            className="mx-auto aspect-square h-auto rounded-md object-cover"
            width={180}
            height={180}
          />
        </SfLink>
        <SfButton
          type="button"
          variant="tertiary"
          size="sm"
          square
          className="absolute bottom-0 right-0 mb-2 mr-2 !rounded-full border border-neutral-200 bg-white"
          aria-label="Add to wishlist"
        >
          <SfIconFavorite size="sm" />
        </SfButton>
      </div>
      <div className="flex flex-1 flex-col border-t border-neutral-200 p-4">
        <SfLink className="block">{brand?.options.join(",")}</SfLink>
        <SfLink href="#" variant="secondary" className="no-underline">
          {name}
        </SfLink>
        <div className="flex items-center pt-1">
          <SfRating size="xs" value={average_rating} max={5} />

          <SfLink href="#" variant="secondary" className="pl-1 no-underline">
            <SfCounter size="xs">{rating_count}</SfCounter>
          </SfLink>
        </div>
        {fragrants?.options?.length > 0 && (
          <p className="my-2 block max-h-[50px] flex-1 overflow-hidden font-normal text-neutral-700 sf-text-sm">
            {fragrants?.options.join(" • ")}
          </p>
        )}

        <span
          className="block pb-2 font-bold sf-text-lg"
          dangerouslySetInnerHTML={{ __html: price_html }}
        ></span>
        {/* <SfButton
          type="button"
          size="sm"
          slotPrefix={<IconShoppingCart className="w-6 h-6" />}
        >
          Thêm vào giỏ hàng
        </SfButton> */}
      </div>
    </div>
  );
}
