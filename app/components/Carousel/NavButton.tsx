import { SfButton } from "@storefront-ui/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type Props = {
  enabled?: boolean;
  onClick: () => void;
};

export const NextButton: React.FC<Props> = (props) => {
  const { enabled, onClick } = props;

  return (
    <SfButton
      className="!rounded-full"
      square
      variant="tertiary"
      onClick={onClick}
      disabled={!enabled}
    >
      <IconChevronRight className="h-6 w-6" />
    </SfButton>
  );
};
export const PrevButton: React.FC<Props> = (props) => {
  const { enabled, onClick } = props;

  return (
    <SfButton
      className="!rounded-full"
      square
      onClick={onClick}
      disabled={!enabled}
    >
      <IconChevronLeft className="h-6 w-6" />
    </SfButton>
  );
};
