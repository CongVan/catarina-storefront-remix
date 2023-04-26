import type { LoaderArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { SfLink } from "@storefront-ui/react";
import ProductDetails from "~/modules/product/components/ProductDetails";
import { ProductGallery } from "~/modules/product/components/ProductGallery";

import { CommerceAPI } from "~/modules/api/commerce";
import { ProductInfo } from "~/modules/product/components/ProductInfo";
import { ProductRelated } from "~/modules/product/components/ProductRelated";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import { getCategoryDetailLink, getProductDetailLink } from "~/utils/helper";

export const loader = async ({ params }: LoaderArgs) => {
  const id = params["*"]?.substring(params["*"].lastIndexOf("-") + 1);

  if (!id) {
    throw new Error("error1: not found product ");
  }
  const { data: product } = await CommerceAPI.products.detail(id);
  if (!product) {
    throw new Error("error2: not found product");
  }

  const promiseVariants = CommerceAPI.productVariants.list({
    id: product.id,
    params: {
      include: product.variations,
    },
  });

  const promiseRelated = CommerceAPI.products.list({
    params: {
      include: product.related_ids,
    },
  });

  return defer({
    promiseVariants,
    product: product,
    promiseRelated,
  });
};

export default function ProductPage() {
  const { product } = useLoaderData<typeof loader>();
  const category = product.categories?.[0];
  return (
    <>
      <Breadcrumbs
        links={[
          {
            href: getCategoryDetailLink(category?.slug, category?.id),
            label: category?.name,
          },
          {
            href: getProductDetailLink(product.slug, product.id),
            label: product.name,
          },
        ]}
      />
      <div className="container mx-auto">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <ProductGallery />
          <ProductDetails />
        </div>
        <ProductInfo />
        <ProductRelated />
      </div>
    </>
  );
}
