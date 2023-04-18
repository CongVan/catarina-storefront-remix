import * as React from "react";
import { useDropdown, SfButton } from "@storefront-ui/react";
import { IconMenu } from "@tabler/icons-react";

export function MenuDropdown() {
  const [isOpen, setOpen] = React.useState(false);

  const close = () => setOpen(false);
  const toggle = () => setOpen((isOpen) => !isOpen);

  const { refs, style } = useDropdown({ isOpen, onClose: close });

  return (
    <div ref={refs.setReference} className="w-max">
      <SfButton
        className="mr-auto block !px-2"
        type="button"
        slotPrefix={<IconMenu />}
        variant="tertiary"
        onClick={toggle}
      >
        <span className="hidden md:inline-flex">Categories</span>
      </SfButton>
      {isOpen && (
        <ul
          ref={refs.setFloating}
          style={style}
          className="absolute w-max rounded bg-gray-100 p-2"
        >
          <li>More</li>
          <li>About</li>
          <li>Settings</li>
        </ul>
      )}
    </div>
  );
}
