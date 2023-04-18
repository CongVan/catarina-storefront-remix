import { NextButton, PrevButton } from "~/components/Carousel/NavButton";
import { useCarousel } from "~/components/hooks/use-carousel";
import type { Product } from "~/types/product";
import ProductCard from "./ProductCard";

export const ProductCarousel: React.FC<{
  products: Product[];
  title?: string;
}> = ({ products, title }) => {
  const { prevBtnEnabled, scrollNext, scrollPrev, nextBtnEnabled, ref } =
    useCarousel({
      loop: false,
      align: "start",
      skipSnaps: false,
      draggable: true,
      containScroll: "trimSnaps",
    });

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className=" sf-headline-3">{title}</div>

        <div className="flex justify-end gap-4">
          <PrevButton enabled={prevBtnEnabled} onClick={scrollPrev} />
          <NextButton enabled={nextBtnEnabled} onClick={scrollNext} />
        </div>
      </div>

      <div ref={ref} className="container mx-auto overflow-hidden">
        <div className="flex py-4">
          {products.map((p) => (
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
  );
};
