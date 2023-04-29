import { NavLink, Outlet } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import { twMerge } from "tailwind-merge";
import { getUserId } from "~/session.server";

const MENUS = [
  {
    title: "Thống kê",
    href: "/account",
    end: true,
  },
  {
    title: "Đơn hàng",
    href: "/account/orders",
  },
  {
    title: "Tài khoản",
    href: "/account/information",
  },
  {
    title: "Đổ mật khẩu",
    href: "/account/change-password",
  },
];

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (!userId) throw redirect("/");
  return json({});
};

export const handle = {
  breadcrumb: { title: "Trang cá nhân" },
};

export default function AccountPage() {
  return (
    <>
      <div className="container">
        <div className="pl-5 font-bold tracking-wide sf-headline-4">
          Trang cá nhân
        </div>

        <div className="mt-5 flex flex-wrap items-start">
          <div className="w-full lg:sticky lg:top-2 lg:w-[260px]">
            <ul className="mb-5 flex w-full flex-nowrap gap-2 overflow-x-scroll lg:flex-col lg:overflow-hidden">
              {MENUS.map((menu) => (
                <li
                  key={menu.href}
                  className="min-w-content flex items-center justify-center"
                >
                  <NavLink
                    to={menu.href}
                    end={menu.end}
                    className={({ isActive, isPending }) =>
                      twMerge(
                        "w-full flex-1 whitespace-nowrap rounded px-5 py-2.5 text-sm font-semibold",
                        isActive && "bg-primary-50 text-primary-600",
                        isPending && "text-gray-600"
                      )
                    }
                  >
                    {menu.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="max-w-full flex-1 lg:ml-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
