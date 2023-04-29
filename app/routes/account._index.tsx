import { Await, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { defer } from "@remix-run/server-runtime";
import { Suspense } from "react";
import { StatisticCard } from "~/modules/account/components/StatisticCard";
import { StatisticSkeleton } from "~/modules/account/components/StatisticSkeleton";
import { CommerceAPI } from "~/modules/api/commerce";
import { getUserId } from "~/session.server";
import { stringifyQuery } from "~/utils/helper";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  const defaultQuery = { customer: userId, page: 1, per_page: 1 };
  const pendingPromises = CommerceAPI.orders.list({
    params: {
      ...defaultQuery,
      status: "pending",
    },
  });
  const processingPromises = CommerceAPI.orders.list({
    params: {
      ...defaultQuery,
      status: "processing",
    },
  });
  const deliveryPromises = CommerceAPI.orders.list({
    params: {
      ...defaultQuery,
      status: "on-hold",
    },
  });

  const completedPromises = CommerceAPI.orders.list({
    params: {
      ...defaultQuery,
      status: "completed",
    },
  });

  const cancelledPromises = CommerceAPI.orders.list({
    params: {
      ...defaultQuery,
      status: "cancelled",
    },
  });

  const refundedPromises = CommerceAPI.orders.list({
    params: {
      ...defaultQuery,
      status: "refunded",
    },
  });

  return defer({
    pendingPromises,
    processingPromises,
    deliveryPromises,
    completedPromises,
    cancelledPromises,
    refundedPromises,
  });
};

export default function AccountStatisticPage() {
  const {
    pendingPromises,
    processingPromises,
    deliveryPromises,
    completedPromises,
    cancelledPromises,
    refundedPromises,
  } = useLoaderData<typeof loader>();
  return (
    <div className="grid grid-cols-3 gap-4">
      <Suspense fallback={<StatisticSkeleton />}>
        <Await resolve={pendingPromises}>
          {({ meta }) => (
            <StatisticCard
              name="Chờ xử lý"
              href={`/account/orders?${stringifyQuery({
                status: ["pending"],
              })}`}
              amount={meta.total}
            />
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<StatisticSkeleton />}>
        <Await resolve={processingPromises}>
          {({ meta }) => (
            <StatisticCard
              name="Đang xử lý"
              href={`/account/orders?${stringifyQuery({
                status: ["processing"],
              })}`}
              amount={meta.total}
            />
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<StatisticSkeleton />}>
        <Await resolve={deliveryPromises}>
          {({ meta }) => (
            <StatisticCard
              name="Đang giao hàng"
              href={`/account/orders?${stringifyQuery({
                status: ["on-hold"],
              })}`}
              amount={meta.total}
            />
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<StatisticSkeleton />}>
        <Await resolve={completedPromises}>
          {({ meta }) => (
            <StatisticCard
              name="Đã giao hàng"
              href={`/account/orders?${stringifyQuery({
                status: ["completed"],
              })}`}
              amount={meta.total}
            />
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<StatisticSkeleton />}>
        <Await resolve={cancelledPromises}>
          {({ meta }) => (
            <StatisticCard
              name="Đơn hủy"
              href={`/account/orders?${stringifyQuery({
                status: ["canceled"],
              })}`}
              amount={meta.total}
            />
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<StatisticSkeleton />}>
        <Await resolve={refundedPromises}>
          {({ meta }) => (
            <StatisticCard
              name="Hoàn trả"
              href={`/account/orders?${stringifyQuery({
                status: ["refunded"],
              })}`}
              amount={meta.total}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
export const handle = {
  breadcrumb: { title: "Thống kê" },
};
