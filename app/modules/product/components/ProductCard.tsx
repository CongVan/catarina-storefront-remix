import { Link } from "@remix-run/react";
import { SfCounter, SfLink, SfRating } from "@storefront-ui/react";
import { twMerge } from "tailwind-merge";
import { AddToWishListButton } from "~/modules/product/components/AddToWishListButton";
import type { Product } from "~/types/product";

export default function ProductCard({
  images,
  name,
  attributes,
  rating_count,
  average_rating,
  price_html,
  slug,
  id,
  className,
}: Product & { className?: string }) {
  const brand = attributes?.find((a) => a.name === "Thương hiệu");
  const fragrants = attributes?.find((a) => a.name === "Mùi hương");
  const linkToDetail = `/${slug}-${id}`;
  return (
    <div
      className={twMerge(
        "flex flex-col rounded-md border border-neutral-200 hover:shadow-lg",
        className
      )}
    >
      <div className="relative py-6">
        <Link to={linkToDetail} className="p-5">
          <img
            src={images?.[0].src}
            alt={name}
            className="mx-auto aspect-square h-auto w-[120px] max-w-[160px] rounded-md object-contain md:w-full"
          />
        </Link>

        <AddToWishListButton
          productId={id}
          className="absolute bottom-0 right-0 mb-2 mr-2"
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-neutral-200 p-4">
        <SfLink
          className="block text-sm uppercase no-underline"
          dangerouslySetInnerHTML={{ __html: brand?.options.join(",") || "" }}
        ></SfLink>
        <SfLink
          href={linkToDetail}
          variant="secondary"
          className="no-underline"
          dangerouslySetInnerHTML={{ __html: name }}
        ></SfLink>
        <div className="flex items-center pt-1">
          <SfRating size="xs" value={average_rating} max={5} />

          <SfLink href="#" variant="secondary" className="pl-1 no-underline">
            <SfCounter size="xs">{rating_count}</SfCounter>
          </SfLink>
        </div>
        {(fragrants?.options?.length || 0) > 0 && (
          <div className="my-2 block flex-1 overflow-hidden font-normal text-neutral-700 sf-text-xs  md:sf-text-sm">
            {fragrants?.options.join(" • ")}
          </div>
        )}

        <span
          className="money block pb-2 font-bold text-secondary-600 sf-text-lg"
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
