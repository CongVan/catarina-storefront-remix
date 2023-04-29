import type { LoaderArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { OrderTable } from "~/modules/account/components/OrderTable";
import { getUserId } from "~/session.server";
import { mergeMeta } from "~/utils/meta";
import qs from "qs";
import { OrderStatusFilter } from "~/modules/account/components/OrderStatusFilter";
import { useState } from "react";

export const loader = async ({ request }: LoaderArgs) => {
  const params = new URL(request.url).searchParams;
  const userId = await getUserId(request);
  console.log('params.get("status")', params.get("status"));

  const query = {
    customer: userId,
    per_page: 10,
    page: 1,
    status: qs.parse(params.toString()).status || ["any"],
  };

  return defer({ query });
};
export default function AccountOrdersPage() {
  const { query } = useLoaderData<typeof loader>();
  const [queryFilter, setQueryFilter] = useState({});

  return (
    <>
      <div>
        <OrderStatusFilter onChange={(f) => setQueryFilter(f)} />
        <OrderTable query={{ ...query, ...queryFilter }} />
      </div>
    </>
  );
}

export const meta = () => {
  return [
    {
      title: "Đơn hàng của bạn",
    },
  ];
};
