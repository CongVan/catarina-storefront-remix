import { IconMoodSad } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

export const NoData: React.FC<{
  message?: string;
  className?: string;
  subMessage?: string;
}> = ({
  message = "Không tìm thấy kết quả",
  subMessage = `Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm sản phẩm!`,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center rounded bg-neutral-100 text-center text-neutral-800",
        "px-5 py-20 text-neutral-600",
        className
      )}
    >
      <IconMoodSad className="h-8 w-8" />
      <div className=" my-2 font-semibold sf-text-base">{message}</div>
      <div>{subMessage}</div>
    </div>
  );
};
