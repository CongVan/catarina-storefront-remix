import { useLoaderData } from "@remix-run/react";
import { NextButton, PrevButton } from "~/components/Carousel/NavButton";
import { useCarousel } from "~/hooks/use-carousel";
import type { loader } from "~/routes/$";

export const ProductGallery: React.FC = () => {
  const { product } = useLoaderData<typeof loader>();

  const { ref, scrollPrev, scrollNext, nextBtnEnabled, prevBtnEnabled } =
    useCarousel({
      loop: false,
      align: "start",
      skipSnaps: false,
      draggable: true,
    });

  return (
    <div className="relative">
      <NextButton
        onClick={scrollNext}
        enabled={nextBtnEnabled}
        className="absolute right-0 top-1/2 z-[1] -translate-y-1/2"
      />
      <PrevButton
        onClick={scrollPrev}
        enabled={prevBtnEnabled}
        className="absolute left-0 top-1/2 z-[1] -translate-y-1/2"
      />
      <div ref={ref} className="overflow-hidden">
        <div className="flex">
          {product.images.map((img) => (
            <div key={img.src} className="flex-shrink-0 flex-grow-0 basis-full">
              <img
                src={img.src}
                className="mx-auto aspect-square h-auto w-[100%] max-w-md"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
