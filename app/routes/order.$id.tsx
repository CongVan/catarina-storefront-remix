import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { CommerceAPI } from "~/modules/api/commerce";
import { formatCurrency } from "~/utils/currency";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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
  console.log(order);
  const orderId = "#" + order.order_key.split("_")[2].toUpperCase();

  return (
    <div>
      {/* <Breadcrumbs
        links={[
          { label: "Trang cá nhân", href: "/account" },
          { label: "Đơn hàng của bạn", href: "/account/orders" },
          { label: orderId.toUpperCase(), href: "/account/orders/" + order.id },
        ]}
      /> */}
      <div className=" mx-auto mt-10 max-w-3xl px-4">
        <div>
          <h2 className=" sf-heading-4 mb-1 font-semibold tracking-wider text-secondary-600">
            Cảm ơn, {order.billing.first_name}
          </h2>
          <h3 className=" font-semibold sf-headline-3">Đặt hàng thành công</h3>
          <h3 className="text-md mt-1 font-normal text-neutral-600">
            Đơn hàng {orderId} của bạn đang được xử lý.
          </h3>
        </div>
        <div className="mb-2 mt-5 flex items-start justify-between">
          <div>
            <p className="sf-headline-4">Mã đơn hàng</p>
            <p className="font-semibold text-secondary-600">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="sf-headline-4">Thời gian tạo đơn hàng</p>
            <p className="font-semibold text-secondary-600">
              {dayjs.utc(order.date_created).local().format("HH:mm DD/MM/YYYY")}
            </p>
          </div>
        </div>

        <div className="border-neural-200 mt-5 border-t py-10">
          {order.line_items.map((line) => (
            <div key={line.id} className="flex items-stretch text-sm">
              <div>
                <img
                  src={line.image?.src}
                  className="mr-2 h-[100px] w-[100px] min-w-[100px] object-contain"
                  alt={line.name}
                />
              </div>

              <div className="flex h-full grow flex-col">
                <div className="flex-1 font-semibold sf-headline-5">
                  {line.name}
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <p>
                    <span className="mr-2 text-neutral-600">Số lượng</span>{" "}
                    <span className="text-base font-semibold">
                      {line.quantity}
                    </span>
                  </p>
                  <p>
                    <span className="mr-2 text-neutral-600">Thành tiền</span>{" "}
                    <span className="text-base font-semibold">
                      {formatCurrency(+(line.total || 0))}
                    </span>
                  </p>
                </div>
              </div>

              <div className="font-semibold sf-headline-4">{}</div>
            </div>
          ))}
        </div>
        <div className="border-t border-neutral-200 py-10">
          <div className="ml-[100px]">
            <div className=" mb-1 font-semibold sf-headline-5">
              Thông tin đặt hàng
            </div>
            <ul>
              <li>
                Người đặt: {order.billing.last_name} {order.billing.first_name}
              </li>
              <li>Số điện thoại: {order.billing.phone}</li>
              <li>
                Địa chỉ: {order.billing.address_1}, {order.billing.state},{" "}
                {order.billing.city}
              </li>
              <li>Ghi chú: {order.customer_note}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-200 py-10">
          <div className="ml-[100px] flex">
            <div className="flex-1">
              <div className="mb-1 font-semibold sf-headline-5">
                Thông tin thanh toán
              </div>
              <ul>
                <li>{order.payment_method}</li>
                <li>{order.payment_method_title}</li>
              </ul>
            </div>
            <div className="flex-1">
              <div className="mb-1 font-semibold sf-headline-5">
                Thông tin vận chuyển
              </div>
              <ul>
                <li>{order.shipping_lines[0].method_title}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-200 py-10 text-lg">
          <div className="ml-auto max-w-xs">
            <div className="flex">
              <span>Phí vận chuyển</span>
              <span className="ml-auto font-bold">
                {formatCurrency(order.shipping_total)}
              </span>
            </div>
            <div className="flex">
              <span>Giảm giá</span>
              <span className="ml-auto  font-bold">
                {formatCurrency(order.discount_total)}
              </span>
            </div>
            <div className="flex">
              <span className="font-bold">Tổng tiền</span>
              <span className="ml-auto  font-bold">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
