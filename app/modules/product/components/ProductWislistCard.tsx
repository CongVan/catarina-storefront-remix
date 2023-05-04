import {
  SfButton,
  SfCounter,
  SfIconFavorite,
  SfLink,
  SfRating,
} from "@storefront-ui/react";
import {
  IconHeadingOff,
  IconHeartOff,
  IconShoppingCart,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";

import { twMerge } from "tailwind-merge";
import { Button } from "~/components/Button";
import { useAuth } from "~/hooks/user-auth";
import { CommerceAPI } from "~/modules/api/commerce";
import { AddToWishListButton } from "~/modules/product/components/AddToWishListButton";
import type { Product } from "~/types/product";

export function ProductWishlistCard({
  id,
  name,
  images,
  attributes,
  rating_count,
  average_rating,
  price_html,
  slug,
  className,
  onRemoved,
}: Product & { className?: string; onRemoved?: (id: number) => void }) {
  const brand = attributes?.find((a) => a.name === "Thương hiệu");
  const linkToDetail = `/${slug}-${id}`;
  const { customer } = useAuth();
  console.log(customer);

  const mutation = useMutation(async (body: any) => {
    const data = await CommerceAPI.customers.update(customer?.id, body);

    if (data) {
      toast.success("Đã bỏ yêu thích");
      onRemoved && onRemoved(id);
    }

    return data;
  });

  const remove = () => {
    if (!customer) {
      toast("Vui lòng đăng nhập để sử dụng tính năng này");
    } else {
      mutation.mutate({
        meta_data: [
          {
            key: "favorite-" + id,
          },
        ],
      });
    }
  };
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
          <img
            src={images?.[0].src}
            alt={name}
            className=" aspect-square  rounded-md object-contain"
            width={100}
            height={100}
          />
        </SfLink>
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
        <div className="flex flex-nowrap items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            slotPrefix={<IconShoppingCart />}
            className="flex-1"
          >
            Mua ngay
          </Button>
          <Button
            loading={mutation.isLoading}
            onClick={() => remove()}
            variant="tertiary"
            size="sm"
            slotPrefix={<IconHeartOff />}
          >
            Bỏ
          </Button>
        </div>
      </div>
    </div>
  );
}
