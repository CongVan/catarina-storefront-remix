import { Form, useRouteLoaderData } from "@remix-run/react";
import { SfButton, useDropdown } from "@storefront-ui/react";
import { IconUser } from "@tabler/icons-react";
import React from "react";
import type { User } from "~/types/user";

export function UserDropdown() {
  const root = useRouteLoaderData("root") as any;
  const user = root.user as User;
  const ENV = root.ENV;
  const [isOpen, setOpen] = React.useState(false);

  const close = () => setOpen(false);
  const toggle = () => setOpen((isOpen) => !isOpen);

  const { refs, style } = useDropdown({ isOpen, onClose: close });

  return (
    <div ref={refs.setReference} className="w-max">
      <SfButton
        className="mr-auto block !px-2"
        type="button"
        slotPrefix={<IconUser />}
        variant="tertiary"
        onClick={toggle}
      >
        <span className="hidden md:inline-flex">{user.email}</span>
      </SfButton>
      {isOpen && (
        <ul
          ref={refs.setFloating}
          style={style}
          className="absolute w-max rounded bg-white p-2"
        >
          <li className="py-2">Đơn hàng</li>
          <li className="py-2">Thông tin tài khoản</li>
          <li className="py-2">
            <Form method="post" action="/logout" reloadDocument>
              <input type="submit" value="Đăng xuất" />
            </Form>
          </li>
        </ul>
      )}
    </div>
  );
}
