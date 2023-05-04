import { useAsyncValue, useLoaderData } from "@remix-run/react";
import { SfButton } from "@storefront-ui/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AddToCartButton } from "~/modules/product/components/AddToCartButton";
import type { loader } from "~/routes/$";
import type { Product } from "~/types/product";
import type { ProductVariant } from "~/types/product-variations";

export const ProductVariants: React.FC = () => {
  const { product, promiseVariants } = useLoaderData<typeof loader>();
  const { data } = useAsyncValue() as Awaited<typeof promiseVariants>;
  console.log("variants", data);

  const [currentVariant, setVariant] = useState<ProductVariant | null>(null);
  return (
    <>
      <div className="mb-2 w-full text-gray-700 sf-headline-5">
        Chọn kích thước
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {data.map((o) => (
          <SfButton
            key={o.id}
            variant={"tertiary"}
            className={twMerge(
              "border border-gray-200 px-5 font-normal sf-text-sm hover:border-primary-600",
              currentVariant?.id === o.id && "border-primary-600 bg-primary-100"
            )}
            onClick={() => setVariant(o as ProductVariant)}
          >
            {o.attributes.map((a) => a.option).join(",")}
          </SfButton>
        ))}
      </div>
      <AddToCartButton product={product as Product} variant={currentVariant} />
    </>
  );
};
