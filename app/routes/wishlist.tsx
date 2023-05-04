import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/router";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { SfLink } from "@storefront-ui/react";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Button } from "~/components/Button";
import { CommerceAPI } from "~/modules/api/commerce";
import { ProductHorizontalCardSkeleton } from "~/modules/product/components/ProductHorizontalCardSkeleton";
import { ProductWishlistCard } from "~/modules/product/components/ProductWislistCard";
import { getUserById, getUserId } from "~/session.server";
import type { Product } from "~/types/product";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);

  if (!userId) {
    throw redirect("/");
  }
  const user = await getUserById(userId);
  const productIds = user.meta_data
    .filter((s) => s.key.startsWith("favorite-") && s.value)
    .map((s) => +s.value);

  return json({
    productIds,
  });
};

const PAGE_SIZE = 24;
export const handle = {
  breadcrumb: { title: "Yêu thích" },
};

export default function WishlistPage() {
  const { productIds } = useLoaderData<typeof loader>();
  const [page, setPage] = useState(1);
  const [removedList, setRemovedList] = useState<number[]>([]);
  const containerClass =
    "mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rentina-lg:grid-cols-3 border border-b-0 border-r-0";

  const hasMore = useMemo(() => {
    return page * PAGE_SIZE <= productIds.length;
  }, [page, productIds]);

  const noData = useMemo(() => {
    return productIds.filter((s) => !removedList.includes(+s)).length <= 0;
  }, [productIds, removedList]);

  const [list, setList] = useState<Product[]>([]);

  const { isLoading } = useQuery(
    "proudct-wishlist" + page,
    async () =>
      await CommerceAPI.products.list({
        params: {
          include: productIds
            .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
            .filter((s) => s > 0),
        },
      }),
    {
      enabled: !noData,
      onSuccess(data) {
        setList((s) => s?.concat(data.data));
      },
    }
  );

  return (
    <div className="container">
      <h2 className="font-semibold sf-headline-4">Sản phẩm yêu thích</h2>
      <div className="mt-5">
        {noData && (
          <div className="flex w-full flex-col items-center justify-center p-10">
            <div className="font-semibold sf-headline-5">
              Bạn chưa có sản phẩm yêu thích nào
            </div>
            <div className="text-sm text-gray-700">
              <SfLink as={Link} to="/">
                Khám phá danh mục
              </SfLink>{" "}
            </div>
          </div>
        )}
        <div></div>
        {page === 1 && isLoading ? (
          <div className={containerClass}>
            {Array.from(Array(12)).map((_, i) => (
              <ProductHorizontalCardSkeleton
                key={i}
                className={"rounded-none border-l-0 border-t-0"}
              />
            ))}
          </div>
        ) : (
          <>
            <div className={containerClass}>
              {list
                .filter((s) => !removedList.includes(s.id))
                .map((p) => (
                  <ProductWishlistCard
                    className="rounded-none border-l-0 border-t-0"
                    onRemoved={(id) => setRemovedList((s) => s.concat(id))}
                    key={p.id}
                    {...p}
                  />
                ))}
            </div>

            {hasMore && (
              <div className=" col-span-full mt-5 flex justify-center">
                <Button
                  loading={isLoading}
                  className="px-10"
                  onClick={() => setPage((p) => p + 1)}
                >
                  Tải thêm
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
