import { Await, useLoaderData } from "@remix-run/react";
import {
  SfButton,
  SfCounter,
  SfIconCompareArrows,
  SfIconFavorite,
  SfIconPackage,
  SfIconSafetyCheck,
  SfIconSell,
  SfIconWarehouse,
  SfLink,
  SfRating,
} from "@storefront-ui/react";
import { Suspense } from "react";
import { AddToCartButton } from "~/modules/product/components/AddToCartButton";
import { ProductVariants } from "~/modules/product/components/ProductVariants";
import type { loader } from "~/routes/$";
import { getBrand } from "~/utils/helper";

export default function ProductDetails() {
  const { product, promiseVariants } = useLoaderData<typeof loader>();

  return (
    <section className="md:max-w-[640px]">
      <div className="mb-4 flex gap-2">
        {product.categories?.map((c) => (
          <div
            key={c.id}
            className="inline-flex items-center justify-center rounded-full border border-secondary-600 bg-secondary-50 px-3 py-1.5 text-sm font-semibold text-secondary-600"
          >
            {c.name}
          </div>
        ))}
        <div className="inline-flex items-center justify-center rounded-full border border-secondary-600 bg-secondary-50 px-3 py-1.5 text-sm font-semibold text-secondary-600">
          {getBrand(product)}
        </div>

        {product.on_sale && (
          <div className="mb-4 inline-flex items-center justify-center bg-secondary-600 px-3 py-1.5 text-sm font-medium text-white">
            <SfIconSell size="sm" className="mr-1.5" />
            Sale
          </div>
        )}
      </div>

      <h1
        className="mb-1 font-bold sf-headline-2"
        dangerouslySetInnerHTML={{ __html: product.name }}
      ></h1>
      <div
        className="mt-2 block font-bold text-primary-600 sf-headline-3"
        dangerouslySetInnerHTML={{ __html: product.price_html }}
      ></div>
      <div className="mb-4 mt-4 inline-flex items-center">
        <SfRating size="xs" value={product.average_rating} max={5} />
        <SfCounter className="ml-1" size="xs">
          {product.average_rating}
        </SfCounter>
        <SfLink
          href="#"
          variant="secondary"
          className="ml-2 text-xs text-neutral-500"
        >
          {product.rating_count} reviews
        </SfLink>
      </div>
      <ul className="sf-text-md mb-4 font-normal">
        {product.attributes
          .filter((s) => !s.variation)
          .map((attr) => (
            <li key={attr.id} className="mb-2">
              <span>{attr.name}: </span>
              <span>{attr.options.join(", ")}</span>
            </li>
          ))}
      </ul>

      <Suspense fallback={<>Loading...</>}>
        <Await resolve={promiseVariants}>
          <div className="mb-4 ">
            <ProductVariants />
          </div>
          <div className="mb-4 border-y border-gray-200 py-4">
            {/* <div className="typography-text-sm mb-4 flex items-center justify-center gap-1.5 rounded-md bg-primary-100 py-1.5 text-primary-700">
          <SfIconShoppingCartCheckout /> {}
        </div> */}
            <div className="flex justify-center gap-x-4">
              <SfButton
                type="button"
                size="sm"
                variant="tertiary"
                slotPrefix={<SfIconCompareArrows size="sm" />}
              >
                Compare
              </SfButton>
              <SfButton
                type="button"
                size="sm"
                variant="tertiary"
                slotPrefix={<SfIconFavorite size="sm" />}
              >
                Add to list
              </SfButton>
            </div>
          </div>
        </Await>
      </Suspense>

      <div className="flex first:mt-4">
        <SfIconPackage
          size="sm"
          className="mr-1 flex-shrink-0 text-neutral-500"
        />
        <p className="text-sm">
          Free shipping, arrives by Thu, Apr 7. Want it faster?
          <SfLink href="#" variant="secondary" className="mx-1">
            Add an address
          </SfLink>
          to see options
        </p>
      </div>
      <div className="mt-4 flex">
        <SfIconWarehouse
          size="sm"
          className="mr-1 flex-shrink-0 text-neutral-500"
        />
        <p className="text-sm">
          Pickup not available at your shop.
          <SfLink href="#" variant="secondary" className="ml-1">
            Check availability nearby
          </SfLink>
        </p>
      </div>
      <div className="mt-4 flex">
        <SfIconSafetyCheck
          size="sm"
          className="mr-1 flex-shrink-0 text-neutral-500"
        />
        <p className="text-sm">
          Free 30-days returns.
          <SfLink href="#" variant="secondary" className="ml-1">
            Details
          </SfLink>
        </p>
      </div>
      <div className="mt-4"></div>
    </section>
  );
}
