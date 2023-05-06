import {
  SfButton,
  SfCounter,
  SfIconFavorite,
  SfLink,
  SfRating,
} from "@storefront-ui/react";

import { twMerge } from "tailwind-merge";
import LazyImage from "~/components/LazyImage";
import { AddToWishListButton } from "~/modules/product/components/AddToWishListButton";
import type { Product } from "~/types/product";

export function ProductHorizontalCard({
  id,
  name,
  images,
  attributes,
  rating_count,
  average_rating,
  price_html,
  slug,
  className,
}: Product & { className?: string }) {
  const brand = attributes?.find((a) => a.name === "Thương hiệu");
  const linkToDetail = `/${slug}-${id}`;

  return (
    <div
      className={twMerge(
        "transition-all duration-300 ease-in-out",
        "flex w-full items-center rounded-md border border-neutral-200 p-4 hover:shadow-lg",
        "flex-nowrap",
        className
      )}
    >
      <div className="relative w-[120px] min-w-[120px]">
        <SfLink href={linkToDetail} className="">
          <LazyImage
            src={images?.[0].src}
            alt={name}
            className=" aspect-square  rounded-md object-contain"
            width={100}
            height={100}
          />
        </SfLink>
        <AddToWishListButton
          productId={id}
          className="absolute bottom-0 right-0 mb-2 mr-2"
          iconClass="w-4 h-4"
        />
      </div>
      <div className="min-w-0 flex-1 pl-2">
        <SfLink
          className="block text-xs uppercase no-underline"
          dangerouslySetInnerHTML={{ __html: brand?.options.join(",") || "" }}
        ></SfLink>
        <SfLink
          href={linkToDetail}
          variant="secondary"
          className="line-clamp-1 no-underline"
          dangerouslySetInnerHTML={{ __html: name }}
        ></SfLink>

        <div className="flex items-center">
          <SfRating size="xs" value={average_rating} max={5} />

          <SfLink href="#" variant="secondary" className="pl-1 no-underline">
            <SfCounter size="xs">{rating_count}</SfCounter>
          </SfLink>
        </div>
        <span
          className="block pb-2 font-bold text-secondary-600 sf-text-lg"
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
