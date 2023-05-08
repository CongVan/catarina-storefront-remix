import type { LoaderArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CommerceAPI } from "~/modules/api/commerce";
import { CategoryFilter } from "~/modules/category/template/CategoryFilter";
import { ProductList } from "~/modules/category/template/ProductList";
import type { CategoryQueryParams } from "~/types/common";

import { parseQuery } from "~/utils/helper";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const query = parseQuery(url.searchParams.toString()) as CategoryQueryParams;
  const attributes = await CommerceAPI.productAttributes.list({
    params: { per_page: 20 },
  });
  const brandAttribute = attributes.data.find((a) => a.slug === "pa_brand");
  const { data: term } = await CommerceAPI.productAttributeTerms.detail(
    query?.attribute_term,
    {
      id: brandAttribute?.id,
    }
  );
  const promise = CommerceAPI.products.list({
    params: {
      ...query,
      page: 1,
    },
  });
  return defer({
    query,
    attributes,
    promise,
    breadcrumb: {
      title: term?.name,
    },
    term,
  });
};

export default function ExplorePage() {
  const { query, term, promise } = useLoaderData<typeof loader>();
  console.log(query);

  return (
    <div>
      {/* <CategoryFilter attributes={attributes.data} /> */}
      <div className="container">
        <div className="sf-headline-2">{term.name}</div>
        <ProductList promise={promise as any} />
      </div>
    </div>
  );
}

export const handle = {
  breadcrumb: { title: "Khám phá" },
};
