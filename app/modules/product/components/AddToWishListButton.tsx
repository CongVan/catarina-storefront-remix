import { useRouteLoaderData } from "@remix-run/react";
import { SfButton, SfIconFavorite } from "@storefront-ui/react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { twMerge } from "tailwind-merge";
import { useTheme } from "~/context/theme";
import { CommerceAPI } from "~/modules/api/commerce";
import type { RootLoaderData } from "~/types/common";

export const AddToWishListButton: React.FC<{
  className?: string;
  productId: number;
}> = ({ className, productId }) => {
  const { showLogin } = useTheme();
  const { user } = useRouteLoaderData("root") as RootLoaderData;
  const mutation = useMutation(async (body: any) => {
    const data = await CommerceAPI.customers.update(user?.id, {
      data: body,
    });

    if (data) {
      toast.success("Đã thêm vào danh sách yêu thích");
    }
    return data;
  });

  const [favorite, setFavorite] = useState(() => {
    if (user) {
      return !!user.meta_data?.find(
        (m) => m.key === "favorite" && m.value === productId + ""
      );
    }
    return false;
  });

  const add = () => {
    if (favorite) {
      return toast.success("Đã thêm vào danh sách yêu thích");
    }
    if (!user) {
      toast("Vui lòng đăng nhập để sử dụng tính năng này");
      showLogin();
    } else {
      setFavorite(true);
      mutation.mutate({
        meta_data: [
          {
            key: "favorite-" + productId,
            value: productId + "",
          },
        ],
      });
    }
  };

  return (
    <SfButton
      type="button"
      variant={favorite ? "secondary" : "tertiary"}
      size="sm"
      square
      disabled={mutation.isLoading}
      className={twMerge(
        "group !rounded-full border border-neutral-200 bg-white",
        className
      )}
      aria-label="Add to wishlist"
      onClick={() => add()}
    >
      {favorite ? (
        <IconHeartFilled className="h-5 w-5  text-primary-600 " />
      ) : (
        <IconHeart className="h-5 w-5" />
      )}
    </SfButton>
  );
};