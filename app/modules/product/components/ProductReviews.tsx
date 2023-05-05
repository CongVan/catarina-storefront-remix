import { ProductReviewForm } from "~/modules/product/components/ProductReviewForm";
import { ProductReviewList } from "~/modules/product/components/ProductReviewList";

export const ProductReviews: React.FC = () => {
  return (
    <div className="mt-10">
      <h3 className=" mb-5 text-center font-semibold uppercase  sf-headline-3">
        Khách hàng đánh giá
      </h3>
      <div className="">
        <ProductReviewForm />
      </div>
      <div className="mx-auto mt-10 max-w-2xl">
        <ProductReviewList />
      </div>
    </div>
  );
};
