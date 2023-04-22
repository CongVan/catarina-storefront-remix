import { Form, Link, useRouteLoaderData } from "@remix-run/react";
import {
  SfButton,
  SfIconFavorite,
  SfIconPerson,
  SfIconShoppingCart,
  SfInput,
} from "@storefront-ui/react";
import { IconHeart, IconSearch } from "@tabler/icons-react";
import classNames from "classnames";
import { CartDrawer } from "~/components/Cart/CartDrawer";
import LoginButton from "~/components/Layout/LoginButton";
import { SearchBox } from "~/components/Layout/SearchBox";
import { UserDropdown } from "~/components/Layout/UserDropdown";
import type { Category } from "~/types/product-category";
import type { Customer } from "~/types/user";

export default function TopNav() {
  const { categories, user } = useRouteLoaderData("root") as {
    categories: Category[];
    user: Customer | null;
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
  ];

  return (
    <div className=" h-full w-full">
      <header className="flex h-14 w-full justify-center border-b border-neutral-200 bg-white md:h-20">
        <div className="container relative mx-auto flex h-full flex-row flex-nowrap items-center justify-start pl-4 md:pl-0">
          <a
            href="/"
            aria-label="SF Homepage"
            className="inline-block font-bold text-primary-700"
          >
            CATARINA
          </a>
          <div className="mx-10 hidden flex-1 md:block">
            <SearchBox />
          </div>
          <nav className="ml-auto flex flex-row flex-nowrap">
            <CartDrawer />
            <SfButton
              className={classNames(
                "-ml-0.5 mr-2 text-primary-700 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200 active:text-primary-700"
              )}
              aria-label={"Yêu thích"}
              variant="tertiary"
              slotPrefix={<IconHeart />}
              square
            />
            {user ? <UserDropdown /> : <LoginButton />}
          </nav>
        </div>
      </header>
      <div className="flex h-12 w-full items-center justify-center border-b border-neutral-200 bg-white">
        <nav className="container mx-auto flex h-full items-center border-l border-neutral-200">
          {categories?.map((c) => (
            <Link
              to={"/c/" + c.slug + "-" + c.id}
              key={c.id}
              className="flex h-full items-center border-r border-neutral-200 px-5 py-1.5"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
