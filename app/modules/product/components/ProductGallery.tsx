import { useLoaderData } from "@remix-run/react";
import { useCarousel } from "~/hooks/use-carousel";
import type { loader } from "~/routes/$";

export const ProductGallery: React.FC = () => {
  const { product } = useLoaderData<typeof loader>();

  const { ref } = useCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
    draggable: true,
  });

  return (
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
  );
};
