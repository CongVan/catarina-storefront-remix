import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { useQuery } from "react-query";
import { NextButton, PrevButton } from "~/components/Carousel/NavButton";
import { useCarousel } from "~/components/hooks/use-carousel";
import { ProductCarouselSkeleton } from "~/modules/home/templates/ProductCarouselSkeleton";
import ProductCard from "~/modules/product/components/ProductCard";
import type { loader } from "~/routes/$";
import { $fetch } from "~/utils/api";

export const ProductRelated: React.FC = () => {
  const { product, promiseRelated } = useLoaderData<typeof loader>();

  const { prevBtnEnabled, scrollNext, scrollPrev, nextBtnEnabled, ref } =
    useCarousel({
      loop: false,
      align: "start",
      skipSnaps: false,
      draggable: true,
      containScroll: "trimSnaps",
    });
  return (
    <div className="mt-10">
      <h3 className=" mb-5 text-center font-semibold uppercase  sf-headline-3">
        Sản phẩm liên quan
      </h3>
      <Suspense fallback={<ProductCarouselSkeleton />}>
        <Await resolve={promiseRelated}>
          {(result) => {
            return result ? (
              <div className="">
                <div className="flex items-center justify-end">
                  <div className="flex justify-end gap-4">
                    <PrevButton enabled={prevBtnEnabled} onClick={scrollPrev} />
                    <NextButton enabled={nextBtnEnabled} onClick={scrollNext} />
                  </div>
                </div>
                {/* <code>{JSON.stringify(result, null, 2)}</code> */}
                <div ref={ref} className="container mx-auto overflow-hidden">
                  <div className="flex py-4">
                    {result.data.map((p: any) => (
                      <div
                        key={p.id}
                        className="mr-0 min-w-0 flex-shrink-0 flex-grow-0 basis-full md:basis-4/12 md:pr-4 xl:basis-3/12"
                      >
                        <ProductCard {...p} className="h-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>No data</>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};
