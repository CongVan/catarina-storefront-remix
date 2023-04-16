import useEmblaCarousel from "embla-carousel-react";
import type { FC, ReactDOM, ReactNode } from "react";
import React, { useCallback, useEffect, useState } from "react";

const Carousel: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
    draggable: true,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div ref={emblaRef} className=" overflow-hidden">
      {children}
    </div>
  );
};

const Slide: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="mr-0 min-w-0 flex-shrink-0 flex-grow-0 basis-3/12 pr-4">
      {children}
    </div>
  );
};

export default {
  Carousel,
  Slide,
};
