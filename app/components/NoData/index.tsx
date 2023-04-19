import { IconMoodSad } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

export const NoData: React.FC<{
  message?: string;
  className?: string;
  subMessage?: string;
}> = ({
  message = "No results found",
  subMessage = `Try adjusting your search or filter to find what you're looking for`,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center rounded bg-neutral-100 text-center text-neutral-800",
        "p-5 text-neutral-600",
        className
      )}
    >
      <IconMoodSad className="h-8 w-8" />
      <div className=" my-2 font-semibold sf-text-base">{message}</div>
      <div>{subMessage}</div>
    </div>
  );
};
