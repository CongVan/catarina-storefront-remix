import { SfIconClose } from "@storefront-ui/react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function AlertError({
  message,
  className,
}: {
  message: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={twMerge(
        "flex items-start rounded-md bg-negative-100 py-1 pl-4 pr-2 text-negative-600 shadow-md ring-1 ring-negative-300 sf-text-sm md:items-center",
        className
      )}
    >
      <p className="mr-2 py-2">{message}</p>
    </div>
  );
}
