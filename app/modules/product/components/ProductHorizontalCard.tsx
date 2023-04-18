import {
  SfButton,
  SfIconRemove,
  SfLink,
  SfIconAdd,
  SfIconSell,
  SfIconDelete,
  SfIconFavorite,
  SfRating,
  SfCounter,
} from "@storefront-ui/react";
import card from "@assets/smartwatch.png";

import { useCounter } from "react-use";
import type { ChangeEvent } from "react";
import { useId } from "react";
import { clamp } from "@storefront-ui/shared";
import type { Product } from "~/types/product";
import { twMerge } from "tailwind-merge";

export function ProductHorizontalCard({
  name,
  images,
  attributes,
  rating_count,
  average_rating,
  price_html,
  className,
}: Product & { className?: string }) {
  const brand = attributes?.find((a) => a.slug === "brand");
  const fragrants = attributes?.find((a) => a.slug === "fragrants");

  return (
    <div
      className={twMerge(
        "flex w-full items-center rounded-md border border-neutral-200 p-4 hover:shadow-lg",
        "flex-nowrap",
        className
      )}
    >
      <div className="relative w-[120px] min-w-[120px]">
        <SfLink href="#" className="">
          <img
            src={images?.[0].src}
            alt={name}
            className=" aspect-square  rounded-md object-cover"
            width={100}
            height={100}
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
      <div className="min-w-0 flex-1 pl-2">
        <SfLink className="block">{brand?.options.join(",")}</SfLink>
        <SfLink
          href="#"
          variant="secondary"
          className="line-clamp-1 no-underline"
          dangerouslySetInnerHTML={{ __html: name }}
        ></SfLink>

        {(fragrants?.options?.length || 0) > 0 && (
          <p className="my-2 line-clamp-1 block font-normal  text-neutral-700 sf-text-sm">
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
