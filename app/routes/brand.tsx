import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { SfLink } from "@storefront-ui/react";
import QueryString from "qs";
import { useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useIntersection } from "react-use";
import { NoData } from "~/components/NoData";
import { CommerceAPI } from "~/modules/api/commerce";
import type { ProductAttributeTerm } from "~/types/product-attribute";
import { stringifyQuery } from "~/utils/helper";

export const loader = async () => {
  const { data } = await CommerceAPI.productAttributes.list();
  const brandAttribute = data.find((s) => s.name === "Thương hiệu");
  if (!brandAttribute) {
    throw new Error("not found brand attribute");
  }

  return json({
    brandAttribute,
  });
};

export default function BrandPage() {
  const { brandAttribute } = useLoaderData<typeof loader>();
  const loadMoreRef = useRef(null);
  const intersection = useIntersection(loadMoreRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      "brands",
      ({ pageParam = 1 }) => {
        return CommerceAPI.productAttributeTerms.list({
          id: brandAttribute?.id,
          params: {
            per_page: 100,
            page: pageParam,
          },
        });
      },
      {
        enabled: true,
        getNextPageParam: ({ meta }) =>
          meta.page && meta.page < meta.totalPage ? meta.page + 1 : undefined,
      }
    );

  const groupBrand = useMemo(() => {
    if (!data) return null;
    return data?.pages
      .map((m) => m.data)
      .flat(1)
      .reduce((group, brand) => {
        const firstLetter = brand.name[0].toUpperCase();
        return {
          ...group,
          [firstLetter]: [...(group[firstLetter] || []), brand],
        };
      }, {} as { [key in string]: ProductAttributeTerm[] });
  }, [data]);
  console.log("hasNextPage", hasNextPage);

  useEffect(() => {
    if (
      intersection &&
      intersection.intersectionRatio >= 1 &&
      hasNextPage &&
      !isLoading
    ) {
      console.log("load more");

      fetchNextPage();
    }
  }, [intersection, hasNextPage, fetchNextPage, isLoading]);
  return (
    <div className="container">
      {isLoading ? (
        <div>Loading...</div>
      ) : !groupBrand ? (
        <NoData message="Không tìm thấy thương hiệu nào" subMessage="" />
      ) : (
        <>
          {Object.entries(groupBrand).map(([letter, brands]) => (
            <div key={letter} className="mb-10">
              <div className="mb-5 h-10 w-full border-b border-neutral-100">
                <div className=" flex h-10 w-10 items-center justify-center rounded-md rounded-bl-none rounded-br-none bg-primary-100 text-center text-xl font-bold uppercase text-primary-600">
                  {letter}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                {brands.map((b) => (
                  <SfLink
                    as={Link}
                    to={
                      "/explore?" +
                      stringifyQuery({
                        attribute: brandAttribute.slug,
                        attribute_term: b.id,
                      })
                    }
                    key={b.name}
                    dangerouslySetInnerHTML={{ __html: b.name }}
                    className="text-sm font-normal !text-gray-800 no-underline hover:!text-primary-600 hover:underline"
                  ></SfLink>
                ))}
              </div>
            </div>
          ))}
          {isFetchingNextPage && <div>Load more...</div>}
        </>
      )}
      <div ref={loadMoreRef} className="py-5"></div>
    </div>
  );
}

export const handle = {
  breadcrumb: { title: "Thương hiệu" },
};
