import { Link } from "@remix-run/react";
import { SfButton, SfTooltip } from "@storefront-ui/react";
import { IconHeart } from "@tabler/icons-react";
import classNames from "classnames";
import { CartDrawer } from "~/components/Cart/CartDrawer";
import LoginButton from "~/components/Layout/LoginButton";
import { SearchBox } from "~/components/Layout/SearchBox";
import { UserDropdown } from "~/components/Layout/UserDropdown";
import { useApp } from "~/hooks/use-app";
import { useAuth } from "~/hooks/user-auth";

export default function TopNav() {
  const { categories } = useApp();

  const { customer } = useAuth();
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
            <SfTooltip label="Sản phẩm yêu thích">
              <SfButton
                className={classNames(
                  "-ml-0.5 mr-2 text-primary-700 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200 active:text-primary-700"
                )}
                aria-label={"Yêu thích"}
                variant="tertiary"
                to="/wishlist"
                as={Link}
                slotPrefix={<IconHeart />}
                square
              />
            </SfTooltip>

            {customer ? <UserDropdown /> : <LoginButton />}
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
          <Link
            to={"/brand"}
            className="flex h-full items-center border-r border-neutral-200 px-5 py-1.5"
          >
            Thương hiệu
          </Link>
        </nav>
      </div>
    </div>
  );
}
