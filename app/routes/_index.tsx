import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

import { CategoryProductCarousel } from "~/modules/home/templates/CategoryProductCarousel";
import { ProductCarouselSkeleton } from "~/modules/home/templates/ProductCarouselSkeleton";
import { ProductCarousel } from "~/modules/product/components/ProductCarousel";

import type { Product } from "~/types/product";
import type { Category } from "~/types/product-category";
import { $fetch } from "~/utils/api";

const fetchLatest = () =>
  $fetch<Product[]>("/products", {
    params: { page: "1", per_page: "10", orderby: "date", order: "desc" },
  });

const fetchPopular = () =>
  $fetch<Product[]>("/products", {
    params: {
      page: "1",
      per_page: "10",
      orderby: "popularity",
      order: "desc",
    },
  });

export const loader = async (a: LoaderArgs) => {
  const { data: categories } = await $fetch<Category[]>(
    "/products/categories",
    {
      params: { orderby: "count", hide_empty: true },
    }
  );
  const promiseLatest = fetchLatest();

  const promisePopular = fetchPopular();

  const categoriesPromises = Promise.all(
    categories.map(async (cate) => {
      const { data } = await $fetch<Product[]>("/products", {
        params: {
          category: cate.id + "",
          per_page: 45 + "",
        },
      });
      return {
        category: cate,
        data: data,
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
      <Suspense fallback={<ProductCarouselSkeleton title="Danh mục" />}>
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
