import { IconStar } from "@tabler/icons-react";
import { useState } from "react";
import { useDebounce } from "react-use";
import { twMerge } from "tailwind-merge";
export const RATING_MESSAGE = {
  1: "Tệ",
  2: "Không hài lòng",
  3: "Bình thường",
  4: "Hài lòng",
  5: "Tuyệt vời",
};
export const RatingInput: React.FC<{
  value?: number;
  onChange: (value) => void;
}> = ({ value, onChange }) => {
  const [currentRating, setCurrentRate] = useState(value || 0);

  useDebounce(
    () => {
      onChange && onChange(currentRating);
    },
    300,
    [currentRating, onChange]
  );

  return (
    <div className="flex items-end gap-2">
      {Array.from(new Array(5)).map((_, i) => (
        <IconStar
          key={i}
          strokeWidth={1}
          className={twMerge(
            "cursor-pointer text-gray-700",
            i + 1 <= currentRating ? "fill-yellow-300" : ""
          )}
          onClick={() => setCurrentRate(i + 1)}
        />
      ))}
      <span className="ml-2 text-sm font-semibold text-primary-600">
        {RATING_MESSAGE[currentRating]}
      </span>
    </div>
  );
};
