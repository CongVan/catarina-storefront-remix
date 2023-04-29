import { Form, Link } from "@remix-run/react";
import { SfButton, useDropdown } from "@storefront-ui/react";
import {
  IconInfoCircle,
  IconLogout,
  IconShoppingCart,
} from "@tabler/icons-react";
import React from "react";
import { useAuth } from "~/hooks/user-auth";

export function UserDropdown() {
  const { customer } = useAuth();
  const [isOpen, setOpen] = React.useState(false);

  const close = () => setOpen(false);
  const toggle = () => setOpen((isOpen) => !isOpen);

  const { refs, style } = useDropdown({
    isOpen,
    onClose: close,
    strategy: "absolute",
    placement: "bottom-end",
  });
  if (!customer) return <></>;
  return (
    <div ref={refs.setReference} className="">
      <SfButton
        className="mr-auto block !px-2"
        type="button"
        slotPrefix={
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 font-bold uppercase">
            {customer.email.substring(0, 2)}
          </div>
        }
        variant="tertiary"
        onClick={toggle}
      >
        <span className="hidden text-sm font-semibold md:inline-flex">
          {customer.email}
        </span>
      </SfButton>
      {isOpen && (
        <ul
          ref={refs.setFloating}
          style={style}
          className="absolute w-[250px] overflow-hidden rounded bg-white text-sm text-neutral-700 shadow"
        >
          <li>
            <Link
              to="/account/orders"
              className="flex w-full grow items-center gap-2 px-3 py-2 hover:bg-neutral-50"
            >
              <IconShoppingCart className="h-6 w-6" />
              <span>Xem đơn hàng</span>
            </Link>
          </li>
          <li>
            <Link
              to="/account"
              className="flex w-full grow items-center gap-2 px-3 py-2 hover:bg-neutral-50"
            >
              <IconInfoCircle />
              <span>Trang cá nhân</span>
            </Link>
          </li>

          <li>
            <Form method="post" action="/logout" reloadDocument>
              <button
                type="submit"
                className="flex w-full grow items-center gap-2 px-3 py-2 hover:bg-neutral-50"
              >
                <IconLogout />
                <span>Đăng xuất</span>
              </button>
            </Form>
          </li>
        </ul>
      )}
    </div>
  );
}
