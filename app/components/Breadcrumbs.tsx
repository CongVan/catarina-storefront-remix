import { Link, useLoaderData, useMatches } from "@remix-run/react";
import { SfLink } from "@storefront-ui/react";
import { IconChevronRight } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

export const Breadcrumbs: React.FC = () => {
  const matches = useMatches();

  console.log(matches);
  if (matches[matches.length - 1].handle?.breadcrumb === false) {
    return <></>;
  }
  return (
    <nav className="mb-3 flex px-5 py-3" aria-label="Breadcrumb">
      <div className="container mx-auto">
        <ol className="inline-flex items-center whitespace-pre-line">
          {matches
            .filter((s) => s.handle && "breadcrumb" in s.handle)
            .map(({ handle, pathname, data }, index, arr) => {
              return (
                <li
                  key={index}
                  {...(index === arr.length - 1 && { "aria-current": "page" })}
                  className="pr-2"
                >
                  <div className="flex items-center whitespace-nowrap">
                    <SfLink
                      className={twMerge(
                        "mr-1 text-sm font-medium !text-neutral-900 no-underline hover:!text-primary-800",
                        index === arr.length - 1 &&
                          "!text-neutral-500 hover:!text-neutral-500"
                      )}
                      as={Link}
                      to={pathname}
                    >
                      {data?.breadcrumb?.title || handle?.breadcrumb.title}
                    </SfLink>
                    {index < arr.length - 1 && (
                      <IconChevronRight className="h-4 w-4 text-neutral-400"></IconChevronRight>
                    )}
                  </div>
                </li>
              );
            })}
        </ol>
      </div>
    </nav>
  );
};
