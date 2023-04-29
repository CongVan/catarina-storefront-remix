import dayjs from "dayjs";
import type { Order } from "~/types/order";
import { formatCurrency } from "~/utils/currency";
import { getOrderStatus } from "~/utils/helper";

export const OrderDetail: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <>
      <div className="mb-2 mt-5 flex items-start justify-between">
        <div>
          <p className="sf-headline-5">Trạng thái</p>
          <p className="font-semibold text-secondary-600">
            {getOrderStatus(order.status)}
          </p>
        </div>
        <div className="text-right">
          <p className="sf-headline-5">Thời gian tạo đơn hàng</p>
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
                  <span className="currency">
                    {formatCurrency(+(line.subtotal || 0))}
                  </span>
                </p>
              </div>
            </div>

            <div className="font-semibold sf-headline-4">{}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-neutral-200 py-10">
        <div className="md:ml-[100px]">
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
        <div className="flex md:ml-[100px]">
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
        <div className="ml-auto md:max-w-xs">
          <div className="flex items-end">
            <span className="sf-headline-5">Phí vận chuyển</span>
            <span className="ml-auto font-bold">
              {formatCurrency(order.shipping_total)}
            </span>
          </div>
          <div className="flex  items-end">
            <span className="sf-headline-5">
              Giảm giá
              {order.coupon_lines.map((c) => (
                <span
                  key={c.code}
                  className="ml-1 rounded-md bg-secondary-50 px-2 py-1 text-xs uppercase text-secondary-500"
                >
                  {c.code}
                </span>
              ))}
            </span>
            <span className="ml-auto font-bold">
              -{formatCurrency(order.discount_total)}
            </span>
          </div>
          <div className="flex  items-end">
            <span className="font-bold sf-headline-5">Tổng tiền</span>
            <span className="ml-auto font-bold">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
