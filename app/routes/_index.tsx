import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { CommerceAPI } from "~/modules/api/commerce";

import { CategoryProductCarousel } from "~/modules/home/templates/CategoryProductCarousel";
import { ProductCarouselSkeleton } from "~/modules/home/templates/ProductCarouselSkeleton";
import { ProductCarousel } from "~/modules/product/components/ProductCarousel";

import type { Product } from "~/types/product";

export const loader = async (a: LoaderArgs) => {
  const { data: categories } = await CommerceAPI.productCategories.list({
    params: {
      orderby: "count",
      hide_empty: true,
    },
  });

  const promiseLatest = CommerceAPI.products.list({
    params: { page: "1", per_page: "10", orderby: "date", order: "desc" },
  });

  const promisePopular = CommerceAPI.products.list({
    params: {
      page: 1,
      per_page: 10,
      orderby: "popularity",
      order: "desc",
    },
  });

  const categoriesPromises = Promise.all(
    categories.map(async (cate) => {
      const { data: products } = await CommerceAPI.products.list({
        params: {
          category: cate.id,
          per_page: 45 + "",
        },
      });
      return {
        category: cate,
        data: products,
      };
    })
  );
  return defer({ promiseLatest, promisePopular, categoriesPromises });
};

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const { promiseLatest, promisePopular, categoriesPromises } =
    useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto mt-5 px-5 md:px-0">
      <Suspense fallback={<ProductCarouselSkeleton title="Mới nhất" />}>
        <Await resolve={promiseLatest}>
          {(result) => (
            <ProductCarousel
              title="Mới nhất"
              products={result.data as Product[]}
            />
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<ProductCarouselSkeleton title="Phổ biến" />}>
        <Await resolve={promisePopular}>
          {(result) => (
            <ProductCarousel
              title="Phổ biến"
              products={result.data as Product[]}
            />
          )}
        </Await>
      </Suspense>
      <Suspense
        fallback={<ProductCarouselSkeleton horizontal title="Danh mục" />}
      >
        <Await resolve={categoriesPromises}>
          {(results) => (
            <>
              {results.map((result, i) => (
                <CategoryProductCarousel
                  key={result.category.id}
                  category={result.category as any}
                  products={result.data as Product[]}
                />
              ))}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

export const handle = { breadcrumb: false };
