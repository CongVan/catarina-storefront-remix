import { Fragment, useMemo } from "react";
import { NextButton, PrevButton } from "~/components/Carousel/NavButton";
import { useCarousel } from "~/components/hooks/use-carousel";
import type { Product } from "~/types/product";
import type { Category } from "~/types/product-category";
import chunk from "lodash/chunk";
import { ProductHorizontalCard } from "~/modules/product/components/ProductHorizontalCard";

export const CategoryProductCarousel: React.FC<{
  category: Category;
  products: Product[];
}> = ({ category, products }) => {
  const { prevBtnEnabled, scrollNext, scrollPrev, nextBtnEnabled, ref } =
    useCarousel({
      loop: false,
      align: "start",
      skipSnaps: false,
      draggable: true,
      containScroll: "trimSnaps",
    });

  const slides = useMemo(() => {
    return chunk(products, Math.round(products.length / 3));
  }, [products]);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className=" sf-headline-3">{category.name}</div>

        <div className="flex justify-end gap-4">
          <PrevButton enabled={prevBtnEnabled} onClick={scrollPrev} />
          <NextButton enabled={nextBtnEnabled} onClick={scrollNext} />
        </div>
      </div>

      <div ref={ref} className="container mx-auto overflow-hidden">
        <div className="flex py-4">
          {slides.map((slide, i) => (
            <div key={i} className=" flex-shrink-0 flex-grow-0 basis-full">
              <div className="grid  gap-2 md:mr-2 md:grid-cols-2 xl:grid-cols-3">
                {slide.map((p) => (
                  <ProductHorizontalCard key={p.id} {...p} className="" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
