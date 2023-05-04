import { SfButton } from "@storefront-ui/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useMountedState } from "react-use";
import { twMerge } from "tailwind-merge";

type Props = {
  enabled?: boolean;
  onClick: () => void;
  className?: string;
};

export const NextButton: React.FC<Props> = (props) => {
  const { enabled, onClick } = props;
  const mounted = useMountedState();

  return (
    <SfButton
      className={twMerge("!rounded-full", props.className)}
      square
      variant="tertiary"
      onClick={onClick}
      disabled={mounted() && !enabled}
    >
      <IconChevronRight className="h-6 w-6" />
    </SfButton>
  );
};
export const PrevButton: React.FC<Props> = (props) => {
  const { enabled, onClick } = props;

  const mounted = useMountedState();

  return (
    <SfButton
      className={twMerge("!rounded-full", props.className)}
      square
      onClick={onClick}
      disabled={mounted() && !enabled}
    >
      <IconChevronLeft className="h-6 w-6" />
    </SfButton>
  );
};
