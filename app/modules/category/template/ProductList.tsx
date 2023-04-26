import { Await, useLoaderData } from "@remix-run/react";
import { SfButton, SfLoaderLinear } from "@storefront-ui/react";
import { Suspense, useState } from "react";
import { useQuery } from "react-query";
import { NoData } from "~/components/NoData";
import { CommerceAPI } from "~/modules/api/commerce";
import ProductCard from "~/modules/product/components/ProductCard";
import ProductCardSkeleton from "~/modules/product/components/ProductCardSkeleton";
import type { loader } from "~/routes/c.$slug";
import type { WooResponse } from "~/types/common";
import type { Product } from "~/types/product";

type Props = {
  promise: Promise<WooResponse<Product[]>>;
  showCount?: boolean;
};
export const ProductList: React.FC<Props> = ({ promise, showCount }) => {
  const { query } = useLoaderData<typeof loader>();
  const containerClass =
    "mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 rentina-xl:grid-cols-4 border border-b-0 border-r-0";

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasMore] = useState(true);
  const [resultMore, setResultMore] = useState<Product[]>([]);
  const { data, isLoading, refetch } = useQuery(
    ["products", page],
    async () =>
      await CommerceAPI.products.list({
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
          {({ data: products, meta }) => {
            return (
              <>
                {showCount && (
                  <div className=" font-normal sf-headline-4">
                    Tìm thấy ({meta.total}) sản phẩm
                  </div>
                )}

                {products?.length === 0 ? (
                  <NoData />
                ) : (
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
                      {hasNextPage && meta.total > query.per_page && (
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
                )}
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};
