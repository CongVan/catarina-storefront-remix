import type { LoaderArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { SfButton } from "@storefront-ui/react";
import { IconArrowBack, IconArrowLeft } from "@tabler/icons-react";
import { OrderDetail } from "~/modules/account/components/OrderDetail";
import { CommerceAPI } from "~/modules/api/commerce";

export const loader = async ({ request, params }: LoaderArgs) => {
  const { data: order } = await CommerceAPI.orders.detail(params.id);
  return defer({
    order,
    breadcrumb: {
      title: order.id,
    },
  });
};
export default function AccountOrdersPage() {
  const { order } = useLoaderData<typeof loader>();
  return (
    <div>
      <SfButton
        slotPrefix={<IconArrowLeft />}
        variant="tertiary"
        className="mx-auto mb-10"
        as={Link}
        to={"/account/orders"}
      >
        Trở về danh sách đơn hàng
      </SfButton>
      <div className="mx-auto max-w-xl border border-gray-100 p-10 shadow-sm">
        <OrderDetail order={order}></OrderDetail>
      </div>
    </div>
  );
}

export const handle = {
  breadcrumb: { title: "" },
};
