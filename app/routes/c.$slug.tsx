import { defer } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/server-runtime";
import { SfLink } from "@storefront-ui/react";
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

  return defer({ category: category, promise, query });
}

export default function CategoryPage() {
  const { promise, category } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto">
      <div className="space-x-4">
        <SfLink to="/" className="text-sm" as={Link}>
          Home
        </SfLink>
        <SfLink variant="secondary" className="text-sm">
          {category.name}
        </SfLink>
      </div>
      <ProductList promise={promise as Promise<WooResponse<Product[]>>} />
    </div>
  );
}
