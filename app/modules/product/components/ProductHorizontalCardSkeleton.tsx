import { twMerge } from "tailwind-merge";
import { Skeleton } from "~/components/Skeleton";

export function ProductHorizontalCardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "transition-all duration-300 ease-in-out",
        "flex w-full items-center rounded-md border border-neutral-200 p-4 hover:shadow-lg",
        "flex-nowrap",
        className
      )}
    >
      <div className="relative w-[120px] min-w-[120px]">
        <Skeleton className="aspect-square h-full w-full rounded-none" />
      </div>
      <div className="min-w-0 flex-1 pl-2">
        <Skeleton className="h-1.5 w-3/12" />

        <Skeleton className="mt-2 h-1.5 w-6/12" />

        <div className="flex items-center">
          <Skeleton className="h-1.5 w-3/12" />

          <Skeleton className="h-1.5 w-3/12" />
        </div>
        <Skeleton className="mt-4 h-2.5 w-7/12" />
      </div>
    </div>
  );
}
