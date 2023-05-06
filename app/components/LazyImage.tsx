import { IconPhotoFilled } from "@tabler/icons-react";
import type { FC, ImgHTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

const LazyImage: FC<ImageProps> = ({
  containerClassName = "",
  alt = "catarina",
  src = "",
  className = "object-contain w-full h-full",
  ...args
}) => {
  const imageRef = useRef(null);
  const [once, setOnce] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const intersection = useIntersection(imageRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  const renderLoadingPlaceholder = () => {
    return (
      <div
        className={`${className} flex items-center justify-center text-neutral-100`}
      >
        <IconPhotoFilled className="h-12 w-12" />
      </div>
    );
  };

  useEffect(() => {
    if (intersection && intersection.intersectionRatio >= 1 && !once) {
      setOnce(true);
      setImgSrc(src);
    }
  }, [intersection, once, src]);

  return (
    <div ref={imageRef}>
      {imgSrc ? (
        <img src={imgSrc} className={className} alt={alt} {...args} />
      ) : (
        renderLoadingPlaceholder()
      )}
    </div>
  );
};

export default LazyImage;
