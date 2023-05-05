import { defer } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { SfLink } from "@storefront-ui/react";
import { CommerceAPI } from "~/modules/api/commerce";
import { ProductList } from "~/modules/category/template/ProductList";

export const loader = async ({ request, params }: LoaderArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (!q) {
    throw new Error("not found query");
  }

  const query = { search: q, per_page: 24, page: 1 };
  const promise = CommerceAPI.products.list({ params: query });

  return defer({
    q: request.url,
    query,
    promise,
  });
};

export default function SearchPage() {
  const { promise } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto">
      <ProductList promise={promise as any} showCount={true} />
    </div>
  );
}

export const handle = {
  breadcrumb: { title: "Tìm kiếm sản phẩm" },
};
