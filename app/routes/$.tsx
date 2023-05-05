import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { defer } from "@remix-run/node";
import ProductDetails from "~/modules/product/components/ProductDetails";
import { ProductGallery } from "~/modules/product/components/ProductGallery";

import { CommerceAPI } from "~/modules/api/commerce";
import { ProductInfo } from "~/modules/product/components/ProductInfo";
import { ProductRelated } from "~/modules/product/components/ProductRelated";
import { ProductReviews } from "~/modules/product/components/ProductReviews";
import { metaDescription, metaTitle } from "~/utils/helper";

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
    id,
    promiseVariants,
    product: product,
    promiseRelated,
    breadcrumb: {
      title: product.name,
    },
  });
};

export default function ProductPage() {
  return (
    <>
      <div className="container mx-auto">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <ProductGallery />
          <ProductDetails />
        </div>
        <ProductInfo />
        <ProductReviews />
        <ProductRelated />
      </div>
    </>
  );
}

export const handle = {
  breadcrumb: { title: "" },
};

export const meta: V2_MetaFunction = ({ data }) => [
  {
    title: metaTitle(data.product.name),
  },
  {
    property: "description",
    content: metaDescription(data.product.short_description),
  },
  { property: "image", content: data.product?.images?.[0]?.src },
];
