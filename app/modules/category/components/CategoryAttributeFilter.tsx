import {
  SfButton,
  SfCheckbox,
  SfTooltip,
  useDropdown,
} from "@storefront-ui/react";
import { IconChevronDown, IconFilter } from "@tabler/icons-react";
import { Fragment, useState } from "react";
import { InView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { Button } from "~/components/Button";
import { CommerceAPI } from "~/modules/api/commerce";
import type { ProductAttribute } from "~/types/product-attribute";

export const CategoryAttributeFilter: React.FC<{
  attribute: ProductAttribute;
}> = ({ attribute }) => {
  const [isOpen, setOpen] = useState(false);

  const close = () => setOpen(false);
  const toggle = () => setOpen((isOpen) => !isOpen);
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      "attribute-" + attribute.id,
      ({ pageParam = 1 }) =>
        CommerceAPI.productAttributeTerms.list({
          id: attribute.id,
          params: {
            page: pageParam,
            per_page: 50,
          },
        }),
      {
        getNextPageParam: ({ meta }) =>
          meta.page && meta.page < meta.totalPage ? meta.page + 1 : undefined,
      }
    );
  const { refs, style } = useDropdown({
    isOpen,
    onClose: close,
    strategy: "absolute",
    placement: "bottom-end",
  });

  return (
    <div ref={refs.setReference} className="group">
      <SfButton
        className="!rounded-none !py-2.5 !text-neutral-600"
        type="button"
        variant="tertiary"
        size="sm"
        slotSuffix={<IconChevronDown />}
        onClick={toggle}
      >
        {attribute.name}
      </SfButton>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={style}
          className="absolute flex w-full max-w-[180px] flex-col overflow-hidden  rounded border border-neutral-100 bg-white p-2 text-sm text-neutral-700 shadow"
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              {" "}
              <ul className="scroll mb-2 max-h-64 flex-1 overflow-auto">
                {data?.pages.map((page, i) => (
                  <Fragment key={i}>
                    {page.data.map((term) => (
                      <li key={term.id}>
                        <SfTooltip
                          label={term.name}
                          className="hover flex items-center rounded-sm pl-2 hover:bg-primary-50"
                        >
                          <SfCheckbox
                            id={term.name}
                            name={term.name}
                          ></SfCheckbox>
                          <label
                            className="min-w-0 grow overflow-hidden text-ellipsis whitespace-nowrap p-2"
                            htmlFor={term.name}
                            dangerouslySetInnerHTML={{ __html: term.name }}
                          ></label>
                        </SfTooltip>
                      </li>
                    ))}
                  </Fragment>
                ))}
                {isFetchingNextPage && <li className="p-2">Loading more...</li>}
                {hasNextPage && (
                  <InView
                    as="div"
                    onChange={(inView, entry) => inView && fetchNextPage()}
                    className="p-2"
                  ></InView>
                )}
              </ul>
              <div>
                <Button
                  slotPrefix={<IconFilter />}
                  size="sm"
                  className="w-full text-left shadow-sm"
                >
                  Áp Dụng
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
