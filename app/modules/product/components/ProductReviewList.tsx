import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { useQueries, useQuery } from "react-query";
import { NoData } from "~/components/NoData";
import { Pagination } from "~/components/Pagination";
import { CommerceAPI } from "~/modules/api/commerce";
import { ProductReviewCard } from "~/modules/product/components/ProductReviewCard";

const PAGE_SIZE = 4;

export const ProductReviewList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { id } = useLoaderData();
  const { data, isLoading } = useQuery("/product/reviews/list/" + id, () =>
    CommerceAPI.productReviews.list({
      params: {
        product: id,
      },
    })
  );
  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : data?.data && data.data.length <= 0 ? (
        <NoData />
      ) : (
        <>
          <div className="space-y-4">
            {data?.data.map((item) => (
              <ProductReviewCard key={item.id} {...item} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Pagination
              currentPage={page}
              pageSize={PAGE_SIZE}
              total={data?.meta.total || 0}
              onChange={(p) => setPage(p)}
            />
          </div>
        </>
      )}
    </>
  );
};
