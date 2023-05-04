import { twMerge } from "tailwind-merge";
import { Skeleton } from "~/components/Skeleton";
import ProductCardSkeleton from "~/modules/product/components/ProductCardSkeleton";
import { ProductHorizontalCardSkeleton } from "~/modules/product/components/ProductHorizontalCardSkeleton";

export const ProductCarouselSkeleton: React.FC<{
  title?: string;
  horizontal?: boolean;
}> = ({ title, horizontal }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className=" sf-headline-3">{title}</div>

        <div className="flex justify-end gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto overflow-hidden">
        <div
          className={twMerge(
            "py-4",
            horizontal
              ? " grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 rentina-lg:grid-cols-3"
              : "flex"
          )}
        >
          {Array.from(Array(5)).map((_, i) => (
            <div
              key={i}
              className={twMerge(
                "mr-0 min-w-0",
                horizontal
                  ? ""
                  : "flex-shrink-0 flex-grow-0 basis-full md:basis-4/12 md:pr-4 lg:basis-1/4 xl:basis-1/5 rentina-xl:basis-1/4"
              )}
            >
              {horizontal ? (
                <ProductHorizontalCardSkeleton />
              ) : (
                <ProductCardSkeleton />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
