import { defer } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/server-runtime";
import isEmpty from "lodash/isEmpty";
import { CommerceAPI } from "~/modules/api/commerce";
import { ProductList } from "~/modules/category/template/ProductList";
import type { WooResponse } from "~/types/common";
import type { Product } from "~/types/product";

export async function loader({ params }: LoaderArgs) {
  const id = params.slug?.substring(params.slug.lastIndexOf("-") + 1);

  const { data: category } = await CommerceAPI.productCategories.detail(id);

  if (isEmpty(category)) {
    throw new Error("Not found category");
  }

  const query = {
    category: id,
    per_page: 24,
    page: 1,
  };
  const promise = CommerceAPI.products.list({ params: query });

  return defer({
    category: category,
    promise,
    query,
    breadcrumb: { title: category.name },
  });
}

export default function CategoryPage() {
  const { promise, category } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="container mx-auto">
        <ProductList promise={promise as Promise<WooResponse<Product[]>>} />
      </div>
    </>
  );
}

export const handle = {
  breadcrumb: { title: "" },
};
