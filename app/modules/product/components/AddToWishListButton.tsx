import { SfButton, SfTooltip } from "@storefront-ui/react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { twMerge } from "tailwind-merge";
import { useTheme } from "~/hooks/use-theme";
import { useAuth } from "~/hooks/user-auth";
import { CommerceAPI } from "~/modules/api/commerce";

export const AddToWishListButton: React.FC<{
  className?: string;
  productId: number;
  iconClass?: string;
}> = ({ className, productId, iconClass = "w-5 h-5" }) => {
  const { showLogin } = useTheme();
  const { customer } = useAuth();
  const mutation = useMutation(async (body: any) => {
    const data = await CommerceAPI.customers.update(customer?.id, body);

    if (data) {
      toast.success("Đã thêm vào danh sách yêu thích");
    }
    return data;
  });

  const [favorite, setFavorite] = useState(() => {
    if (customer) {
      return !!customer.meta_data?.find(
        (m) => m.key === "favorite-" + productId && m.value === productId + ""
      );
    }
    return false;
  });

  const add = () => {
    if (favorite) {
      return toast.success("Sản phẩm đã được thêm vào danh sách yêu thích");
    }
    if (!customer) {
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
      aria-label="Thêm vào yêu thích"
      onClick={() => add()}
    >
      <SfTooltip
        label={favorite ? "Đã được yêu thích" : "Thêm vào yêu thích"}
        showArrow
        placement="bottom"
        strategy="absolute"
      >
        {favorite ? (
          <IconHeartFilled
            className={twMerge(" text-primary-600 ", iconClass)}
          />
        ) : (
          <IconHeart className={twMerge(iconClass)} />
        )}
      </SfTooltip>
    </SfButton>
  );
};
