import { Await, useLoaderData } from "@remix-run/react";
import { SfButton, SfLoaderLinear } from "@storefront-ui/react";
import { Fragment, Suspense, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import ProductCard from "~/modules/product/components/ProductCard";
import ProductCardSkeleton from "~/modules/product/components/ProductCardSkeleton";
import type { loader } from "~/routes/c.$slug";
import { fetchProducts } from "~/routes/c.$slug";
import type { WooResponse } from "~/types/common";
import type { Product } from "~/types/product";
import { $fetch } from "~/utils/api";

type Props = {
  promise: Promise<WooResponse<Product[]>>;
};
export const ProductList: React.FC<Props> = ({ promise }) => {
  const { query } = useLoaderData<typeof loader>();
  const containerClass =
    "mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 border border-b-0 border-r-0";

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasMore] = useState(true);
  const [resultMore, setResultMore] = useState<Product[]>([]);
  const { data, isLoading, refetch } = useQuery(
    ["products", page],
    async () =>
      await $fetch<Product[]>("/products", {
        params: {
          ...query,
          page: page,
        },
      }),
    {
      enabled: page > 1,
      onSuccess(data) {
        setHasMore(+(data.meta.page + "") < data.meta.totalPage);
        setResultMore((s) => s.concat(data.data));
      },
    }
  );
  // const {
  //   data,
  //   fetchNextPage,
  //   isLoading,
  //   isFetchingNextPage,
  //   isFetching,
  //   hasNextPage,
  // } = useInfiniteQuery(
  //   "products",
  //   async ({ pageParam = 2 }) => {
  //     console.log("pageParam", pageParam);

  //     const { data, meta } = await $fetch<Product[]>("/products", {
  //       params: {
  //         ...query,
  //         page: pageParam,
  //       },
  //     });

  //     console.log("page ", pageParam, data, meta);

  //     return { data, meta };
  //   },
  //   {
  //     keepPreviousData: false,
  //     refetchInterval: 0,
  //     select: (data) => ({
  //       pages: [...data.pages],
  //       pageParams: [...data.pageParams],
  //     }),
  //     getPreviousPageParam: ({ meta: { page, totalPage } }) =>
  //       page ? (page > 0 ? page - 1 : undefined) : undefined,
  //     getNextPageParam: ({ meta: { page, totalPage } }) =>
  //       page ? (page <= totalPage ? page + 1 : undefined) : undefined,
  //   }
  // );
  console.log("data", data);

  const renderLoader = () => {
    return (
      <div className={containerClass}>
        {Array.from(Array(12)).map((_, i) => (
          <ProductCardSkeleton
            key={i}
            className={"rounded-none border-l-0 border-t-0"}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Suspense fallback={renderLoader()}>
        <Await resolve={promise}>
          {({ data: products }) => {
            return (
              <>
                <div className={containerClass}>
                  {products.map((p) => (
                    <ProductCard
                      key={p.id}
                      {...p}
                      className="rounded-none border-l-0 border-t-0"
                    />
                  ))}
                  {resultMore.map((p) => (
                    <ProductCard
                      key={p.id}
                      {...p}
                      className="rounded-none border-l-0 border-t-0"
                    />
                  ))}
                </div>
                <div className="w-full py-5 text-center">
                  {hasNextPage && (
                    <SfButton
                      className="relative overflow-hidden px-10 font-thin uppercase"
                      onClick={() => setPage((p) => p + 1)}
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <div className="absolute left-0 h-full w-full">
                          <SfLoaderLinear
                            ariaLabel="loading"
                            className="h-full w-full bg-transparent text-primary-400 opacity-40"
                            size="lg"
                          />
                        </div>
                      )}
                      Xem thêm
                    </SfButton>
                  )}
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};
