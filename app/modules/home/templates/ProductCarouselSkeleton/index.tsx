import { Skeleton } from "~/components/Skeleton";
import ProductCardSkeleton from "~/modules/product/components/ProductCardSkeleton";

export const ProductCarouselSkeleton: React.FC<{ title?: string }> = ({
  title,
}) => {
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
        <div className="flex py-4">
          {Array.from(Array(5)).map((_, i) => (
            <div
              key={i}
              className="mr-0 min-w-0 flex-shrink-0 flex-grow-0 basis-full md:basis-4/12 md:pr-4 lg:basis-1/4 xl:basis-1/4"
            >
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
