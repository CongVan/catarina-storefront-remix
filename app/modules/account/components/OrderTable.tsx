import { Link } from "@remix-run/react";
import { SfButton } from "@storefront-ui/react";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "react-query";
import { Pagination } from "~/components/Pagination";
import { CommerceAPI } from "~/modules/api/commerce";
import { formatCurrency } from "~/utils/currency";
import { getOrderStatus } from "~/utils/helper";

export const OrderTable: React.FC<{
  query: any;
}> = ({ query }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery(
    ["orders", page, JSON.stringify(query)],
    async () =>
      await CommerceAPI.orders.list({
        params: {
          ...query,
          page: page,
        },
      }),
    {
      onSuccess(data) {},
    }
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!data || data?.meta.total === 0) {
    return <>Bạn không có đơn hàng nào</>;
  }

  return (
    <>
      <div className="mb-4 sf-headline-5">
        Bạn có{" "}
        <span className=" font-semibold text-neutral-800">
          {data?.meta.total}
        </span>{" "}
        đơn hàng
      </div>
      <div className="relative overflow-x-auto">
        <table className=" w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr className=" whitespace-nowrap">
              <th className="px-6 py-3">Mã đơn</th>
              <th className="px-6 py-3">Số lượng</th>
              <th className="px-6 py-3">Ngày đặt hàng</th>
              <th className="px-6 py-3">Tổng tiền</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((order) => (
              <tr
                key={order.id}
                className="whitespace-nowrap border-b border-neutral-200"
              >
                <td className="px-6 py-3">
                  <Link
                    to={`/account/orders/${order.id}`}
                    className="font-semibold text-secondary-600"
                  >
                    #{order.id}
                  </Link>
                </td>
                <td className="px-6 py-3">
                  {order.line_items
                    .map((s) => s.quantity || 0)
                    .reduce((s, i) => s + i, 0)}{" "}
                  sản phẩm
                </td>
                <td className="px-6 py-3">
                  {dayjs
                    .utc(order.date_created)
                    .local()
                    .format("HH:mm DD/MM/YYYY")}
                </td>
                <td className="money px-6 py-3">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-6 py-3 text-secondary-600">
                  {getOrderStatus(order.status)}
                </td>
                <td className="px-6 py-3">
                  <SfButton
                    size="sm"
                    variant="tertiary"
                    as={Link}
                    to={"/account/orders/" + order.id}
                  >
                    Xem chi tiết
                  </SfButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <Pagination
          pageSize={query.per_page}
          total={data?.meta.total}
          currentPage={page}
          onChange={(p) => setPage(p)}
        />
      </div>
    </>
  );
};
