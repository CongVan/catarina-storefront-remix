import { SfButton } from "@storefront-ui/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useMountedState } from "react-use";

type Props = {
  enabled?: boolean;
  onClick: () => void;
};

export const NextButton: React.FC<Props> = (props) => {
  const { enabled, onClick } = props;
  const mounted = useMountedState();

  return (
    <SfButton
      className="!rounded-full"
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
      className="!rounded-full"
      square
      onClick={onClick}
      disabled={mounted() && !enabled}
    >
      <IconChevronLeft className="h-6 w-6" />
    </SfButton>
  );
};
