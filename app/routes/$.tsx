import type { LoaderArgs } from "@remix-run/node";
import { defer, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { SfLink } from "@storefront-ui/react";
import { ProductGallery } from "~/modules/product/components/ProductGallery";
import ProductDetails from "~/modules/product/components/ProductDetails";

import type { Product } from "~/types/product";
import { $fetch } from "~/utils/api";
import { ProductInfo } from "~/modules/product/components/ProductInfo";
import { ProductRelated } from "~/modules/product/components/ProductRelated";
// import { LoaderFunction } from "react-router"
const fetchRelated = (params: any) => {
  return $fetch<Product[]>("/products", {
    params: params,
  });
};
export const loader = async ({ params }: LoaderArgs) => {
  console.log("params", params);

  const id = params["*"]?.substring(params["*"].lastIndexOf("-") + 1);

  if (!id) {
    throw new Error("error1: not found product ");
  }
  const { data } = await $fetch<Product>("/products/" + id);
  if (!data) {
    throw new Error("error2: not found product");
  }
  console.log(" data.related_ids", data.related_ids);

  const promiseRelated = fetchRelated({
    include: data.related_ids,
    per_page: 24,
    page: 1,
  });
  return defer({
    product: data,
    promiseRelated,
  });
};

export default function ProductPage() {
  const { product } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto px-5">
      <div className="mb-10 space-x-4">
        <SfLink to="/" className="text-sm" as={Link}>
          Home
        </SfLink>
        <SfLink variant="secondary" className="text-sm">
          {product.name}
        </SfLink>
      </div>
      <div className="grid items-start gap-10 md:grid-cols-2">
        <ProductGallery />
        <ProductDetails />
      </div>
      <ProductInfo />
      <ProductRelated />
    </div>
  );
}
