import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { OrderDetail } from "~/modules/account/components/OrderDetail";
import { CommerceAPI } from "~/modules/api/commerce";

export const loader = async ({ params }: LoaderArgs) => {
  const { id } = params;
  if (!id) throw new Error("order not found");
  const { data } = await CommerceAPI.orders.detail(id);
  if (!data) throw new Error("order not found");
  return json({
    order: data,
  });
};

export default function OrderDetailPage() {
  const { order } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className=" mx-auto mt-10 max-w-3xl px-4">
        <div>
          <h2 className=" sf-heading-5 font-semibold tracking-wider text-secondary-600">
            Cảm ơn bạn, {order.billing.first_name}
          </h2>
          <h3 className=" mt-2 font-semibold sf-headline-4">
            Đặt hàng thành công
          </h3>
          <h3 className="text-md font-normal text-neutral-600 sf-headline-5">
            Đơn hàng{" "}
            <span className="text-secondary-600 hover:underline">
              #{order.id}
            </span>{" "}
            của bạn đang được xử lý.
          </h3>
        </div>
        <OrderDetail order={order} />
      </div>
    </div>
  );
}
