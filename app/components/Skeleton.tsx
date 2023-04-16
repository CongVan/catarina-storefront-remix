import { twMerge } from "tailwind-merge";

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={twMerge(
        " h-1.5 w-full animate-pulse rounded-full bg-neutral-100",
        className
      )}
    ></div>
  );
};
