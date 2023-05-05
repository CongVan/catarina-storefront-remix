import { SfRating } from "@storefront-ui/react";
import { IconCheck } from "@tabler/icons-react";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import type { ProductReview } from "~/types/product-review";

export const ProductReviewCard: React.FC<ProductReview> = ({
  reviewer,
  reviewer_email,
  date_created_gmt,
  rating,
  verified,
  review,
}) => {
  return (
    <article className="w-full rounded-md border p-4">
      <header className="flex flex-col items-start pb-4 md:flex-row md:justify-between">
        <div className="flex items-start">
          <div
            className={twMerge(
              "flex h-10 w-10 flex-col items-center justify-center overflow-hidden rounded-full uppercase",
              "bg-primary-50 font-bold text-primary-600"
            )}
          >
            {reviewer.substring(0, 2)}
          </div>
          <div className="flex-col pl-2">
            <span className="text-sm text-neutral-900">
              {reviewer || reviewer_email}
            </span>
            <span className="flex items-end pr-2 text-xs text-neutral-500">
              <SfRating value={rating} max={5} size="lg" className="mr-2" />{" "}
              {dayjs.utc(date_created_gmt).local().format("HH:mm, DD/MM/YYYY")}
            </span>
          </div>
        </div>
        {verified && (
          <p className="flex items-center truncate text-xs text-primary-700">
            <IconCheck className="mr-1 h-6 w-6" /> Xác nhận đã mua hàng
          </p>
        )}
      </header>
      <div
        className="whitespace-pre-wrap pl-12 text-sm text-neutral-900"
        dangerouslySetInnerHTML={{ __html: review }}
      ></div>
    </article>
  );
};
