import { Link, useRouteLoaderData } from "@remix-run/react";
import {
  SfButton,
  SfIconFavorite,
  SfIconPerson,
  SfIconShoppingCart,
} from "@storefront-ui/react";
import classNames from "classnames";
import type { Category } from "~/types/product-category";

export default function TopNav() {
  const { categories } = useRouteLoaderData("root") as {
    categories: Category[];
  };
  const actionItems = [
    {
      icon: <SfIconShoppingCart />,
      ariaLabel: "Cart",
    },
    {
      icon: <SfIconFavorite />,
      ariaLabel: "Wishlist",
    },
    {
      label: "Log in",
      icon: <SfIconPerson />,
      ariaLabel: "Log in",
    },
  ];

  return (
    <div className=" h-full w-full bg-neutral-50">
      <header className="flex h-14 w-full justify-center border-b border-neutral-200 bg-white md:h-20">
        <div className="container relative mx-auto flex h-full flex-row flex-nowrap items-center justify-start">
          <a
            href="/"
            aria-label="SF Homepage"
            className="inline-block text-primary-700"
          >
            CATARINA
          </a>
          <nav className="">
            {categories.map((c) => (
              <Link
                to={"/c/" + c.slug + "-" + c.id}
                key={c.id}
                className="px-2.5 py-1.5"
              >
                {c.name}
              </Link>
            ))}
          </nav>

          <nav className="ml-auto flex flex-row flex-nowrap">
            {actionItems.map((actionItem) => (
              <SfButton
                className={classNames(
                  "-ml-0.5 mr-2 text-primary-700 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200 active:text-primary-700",
                  actionItem.label === "Log in" ? "lg:hidden" : null
                )}
                key={actionItem.ariaLabel}
                aria-label={actionItem.ariaLabel}
                variant="tertiary"
                slotPrefix={actionItem.icon}
                square
              />
            ))}
            <SfButton
              className="-ml-0.5 mr-2 hidden text-primary-700 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200 active:text-primary-700 lg:inline-flex"
              key={actionItems[2].ariaLabel}
              aria-label={actionItems[2].ariaLabel}
              variant="tertiary"
              slotPrefix={actionItems[2].icon}
            >
              Log In
            </SfButton>
          </nav>
        </div>
      </header>
    </div>
  );
}
