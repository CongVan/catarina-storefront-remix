import { Outlet } from "@remix-run/react";
import { mergeMeta } from "~/utils/meta";

export default function AccountOrdersPage() {
  return <Outlet />;
}

export const handle = {
  breadcrumb: { title: "Đơn hàng" },
};

export const meta = mergeMeta(() => {
  return [
    {
      title: "Đơn hảng của bạn",
    },
  ];
});
