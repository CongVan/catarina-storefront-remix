import { Skeleton } from "~/components/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-md border border-neutral-200 hover:shadow-lg">
      <Skeleton className="aspect-square h-[232px] w-full rounded-none" />

      <div className="border-t border-neutral-200 p-4">
        <Skeleton className="h-1.5 w-3/12" />
        <Skeleton className=" mt-2 h-2.5 w-7/12" />
        <div className="flex items-center pt-1">
          <Skeleton className="mt-2 h-1.5 w-6/12" />
        </div>
        <p className="flex flex-wrap gap-4 py-2">
          <Skeleton className="mr-2 inline-block h-1.5 w-12" />
          <Skeleton className="mr-2 inline-block h-1.5 w-12" />
          <Skeleton className="mr-2 inline-block h-1.5 w-12" />
          <Skeleton className="mr-2 inline-block h-1.5 w-12" />
        </p>
        <Skeleton className="mt-4 h-2.5 w-7/12" />
      </div>
    </div>
  );
}
