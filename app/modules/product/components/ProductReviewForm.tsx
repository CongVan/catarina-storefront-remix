import { yupResolver } from "@hookform/resolvers/yup";
import { useLoaderData } from "@remix-run/react";
import { SfRating } from "@storefront-ui/react";
import {
  IconBrandTelegram,
  IconEdit,
  IconElevator,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

import { useDebounce, useToggle } from "react-use";
import { number, object, string } from "yup";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { RatingInput } from "~/components/RatingInput";
import { useTheme } from "~/hooks/use-theme";
import { useAuth } from "~/hooks/user-auth";
import { CommerceAPI } from "~/modules/api/commerce";
import { getFullName } from "~/utils/helper";

const schema = object({
  rating: number().required("Vui lòng chọn đánh giá"),
  review: string()
    .required("Vui lòng nhập nội dung")
    .min(50, "Nội dung đánh giá tối thiểu 50 ký tự"),
}).required();

export const ProductReviewForm: React.FC = () => {
  const { id } = useLoaderData();
  const [visible, toggle] = useToggle(false);
  const { customer } = useAuth();
  const { showLogin } = useTheme();

  const { data, refetch } = useQuery(
    "product/review" + id,
    () =>
      CommerceAPI.productReviews.list({
        params: { product: [id], reviewer_email: customer?.email },
      }),
    {
      enabled: !!customer?.id,
    }
  );

  const mutation = useMutation(
    (body: any) => CommerceAPI.productReviews.create(body),
    {
      onSuccess() {
        refetch();
      },
    }
  );
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rating: 5,
      review: "",
      reviewer: getFullName(customer?.first_name, customer?.last_name),
      reviewer_email: customer?.email,
      product_id: id,
    },
  });

  const onSubmit = (form) => {
    mutation.mutate(form);
  };
  return (
    <div className="mx-auto mt-5 max-w-md text-center">
      {data?.data && data.data.length > 0 ? (
        <div className="rounded bg-positive-50 p-4 text-sm font-normal text-positive-600">
          <p>Cảm ơn bạn đã đánh giá sản phẩm! </p>
          <p>Đánh giá của bản sẽ được kiểm duyệt trước khi được hiển thị.</p>
        </div>
      ) : (
        !visible && (
          <Button
            slotPrefix={<IconEdit />}
            variant="primary"
            size="sm"
            className="mx-auto"
            onClick={() => (customer ? toggle(true) : showLogin())}
          >
            {customer ? "Viết đánh giá" : "Đăng nhập để đánh giá sản phẩm"}
          </Button>
        )
      )}
      {visible && (
        <form
          className="rounded-lg bg-neutral-50 p-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <RatingInput
            onChange={(v) => methods.setValue("rating", v)}
            value={methods.getValues("rating")}
          />
          <div className="text-left text-sm font-semibold text-negative-500">
            {methods.formState.errors["rating"] &&
              methods.formState.errors["rating"].message}
          </div>

          <textarea
            className="mt-2 w-full rounded border border-neutral-200 p-2.5 hover:border-primary-500 focus:outline-primary-600"
            placeholder="Nhập đánh giá (Tối thiệu 50 ký tự)"
            rows={4}
            {...methods.register("review")}
          />
          <div className="text-left text-sm font-semibold text-negative-500">
            {methods.formState.errors["review"] &&
              methods.formState.errors["review"].message}
          </div>

          <div className="flex w-full items-center justify-end gap-2">
            <Button
              variant="tertiary"
              size="sm"
              slotPrefix={<IconX />}
              onClick={() => toggle(false)}
              disabled={mutation.isLoading}
            >
              Đóng
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              slotPrefix={<IconBrandTelegram />}
              loading={mutation.isLoading}
            >
              Gửi đánh giá
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
