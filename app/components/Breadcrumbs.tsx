import { Link } from "@remix-run/react";
import { SfLink } from "@storefront-ui/react";
import { IconChevronDownRight, IconChevronRight } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

type BreadcrumbLink = {
  label?: string;
  href: string;
};

type Props = {
  links: BreadcrumbLink[];
};

export const Breadcrumbs: React.FC<Props> = ({ links }) => {
  const defaultLink: BreadcrumbLink[] = [
    {
      label: "Trang chủ",
      href: "/",
    },
  ];
  return (
    <nav className="mb-3 flex px-5 py-3" aria-label="Breadcrumb">
      <div className="container mx-auto">
        <ol className="inline-flex items-center">
          {defaultLink.concat(links).map((link, index) => (
            <li
              key={link.href}
              {...(index === links.length && { "aria-current": "page" })}
              className="pr-2"
            >
              <div className="flex items-center">
                <SfLink
                  className={twMerge(
                    "mr-1 text-sm font-medium !text-neutral-900 no-underline hover:!text-primary-800",
                    index === links.length &&
                      "!text-neutral-500 hover:!text-neutral-500"
                  )}
                  as={Link}
                  to={link.href}
                >
                  {link.label}
                </SfLink>
                {index <= links.length - 1 && (
                  <IconChevronRight className="h-4 w-4 text-neutral-400"></IconChevronRight>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};
