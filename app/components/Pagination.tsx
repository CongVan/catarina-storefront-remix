import {
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  usePagination,
} from "@storefront-ui/react";
import { Fragment, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export const Pagination: React.FC<{
  pageSize: number;
  total: number;
  currentPage: number;
  onChange: (p: number) => void;
}> = ({ pageSize, total, currentPage, onChange }) => {
  const {
    totalPages,
    pages,
    selectedPage,
    startPage,
    endPage,
    next,
    prev,
    setPage,
    maxVisiblePages,
  } = usePagination({
    totalItems: total,
    pageSize: pageSize,
    currentPage: currentPage,
    maxPages: 3,
  });

  useEffect(() => {
    onChange(selectedPage);
  }, [selectedPage, onChange]);
  return (
    <nav className="mx-auto flex" role="navigation" aria-label="pagination">
      <SfButton
        type="button"
        aria-label="Go to previous page"
        disabled={selectedPage <= 1}
        variant="tertiary"
        slotPrefix={<SfIconChevronLeft />}
        onClick={() => prev()}
      />
      <ul className="flex justify-center">
        {!pages.find((page: number) => page === 1) && (
          <li key={1}>
            <div
              className={twMerge(
                "flex border-t-4 border-transparent pt-1",
                selectedPage === 1 &&
                  "border-t-4 !border-primary-500 font-medium"
              )}
            >
              <button
                type="button"
                className="rounded-md px-4 py-3 text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900"
                aria-current={selectedPage === 1}
                onClick={() => setPage(1)}
              >
                1
              </button>
            </div>
          </li>
        )}
        {startPage > 2 && (
          <li key={"dots"}>
            <div className="flex border-t-4 border-transparent">
              <button
                type="button"
                disabled
                aria-hidden="true"
                className="rounded-md px-4 py-3 text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
              >
                ...
              </button>
            </div>
          </li>
        )}
        {pages.map((page: number) => (
          <Fragment key={page}>
            {maxVisiblePages === 1 && selectedPage === totalPages && (
              <li>
                <div className="flex border-t-4 border-transparent pt-1">
                  <button
                    type="button"
                    className="rounded-md px-4 py-3 text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                    aria-current={endPage - 1 === selectedPage}
                    onClick={() => setPage(endPage - 1)}
                  >
                    {endPage - 1}
                  </button>
                </div>
              </li>
            )}
            <li key={`page-${page}`}>
              <div
                className={twMerge(
                  "flex border-t-4 border-transparent pt-1 ",
                  selectedPage === page &&
                    "border-t-4 !border-primary-500 font-medium"
                )}
              >
                <button
                  type="button"
                  className={twMerge(
                    "rounded-md px-4 py-3 text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900",
                    selectedPage === page &&
                      "!text-neutral-900 hover:!text-primary-800 active:!text-primary-900"
                  )}
                  aria-label={`Page ${page} of ${totalPages}`}
                  aria-current={selectedPage === page}
                  onClick={() => setPage(page)}
                >
                  {page}
                </button>
              </div>
            </li>
            {maxVisiblePages === 1 && selectedPage === 1 && (
              <li>
                <div className="flex border-t-4 border-transparent pt-1">
                  <button
                    type="button"
                    className="rounded-md px-4 py-3 text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                    aria-current={selectedPage === 1}
                    onClick={() => setPage(2)}
                  >
                    2
                  </button>
                </div>
              </li>
            )}
          </Fragment>
        ))}
        {endPage < totalPages - 1 && (
          <li>
            <div className="flex border-t-4 border-transparent pt-1">
              <button
                type="button"
                disabled
                aria-hidden="true"
                className="rounded-md px-4 py-3 text-neutral-500 "
              >
                ...
              </button>
            </div>
          </li>
        )}
        {!pages.find((page: number) => page === totalPages) && (
          <li>
            <div
              className={twMerge(
                "flex border-t-4 border-transparent pt-1 ",
                selectedPage === totalPages &&
                  "border-t-4 !border-primary-500 font-medium"
              )}
            >
              <button
                type="button"
                className="rounded-md px-4 py-3 text-neutral-500 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 "
                aria-current={totalPages === selectedPage}
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </button>
            </div>
          </li>
        )}
      </ul>
      <SfButton
        type="button"
        aria-label="Go to next page"
        disabled={selectedPage >= totalPages}
        variant="tertiary"
        slotSuffix={<SfIconChevronRight />}
        onClick={() => next()}
      />
    </nav>
  );
};
