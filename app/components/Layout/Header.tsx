import { SfButton } from "@storefront-ui/react";
import { IconHeart, IconShoppingCart, IconUser } from "@tabler/icons-react";
import classNames from "classnames";

export default function Header() {
  const actionItems = [
    {
      icon: <IconShoppingCart />,
      ariaLabel: "Cart",
    },
    {
      icon: <IconHeart />,
      ariaLabel: "Wishlist",
    },
    {
      label: "Log in",
      icon: <IconUser />,
      ariaLabel: "Log in",
    },
  ];

  return (
    <div className="h-full w-full bg-neutral-50">
      <header className="flex h-14 w-full justify-center border-b border-neutral-200 bg-white md:h-20">
        <div className="flex h-full w-full max-w-[1536px] flex-row flex-nowrap items-center justify-start px-4 md:px-10">
          <a
            href="/"
            aria-label="SF Homepage"
            className="inline-block font-bold uppercase text-primary-700 sf-headline-4"
          >
            Catarina
          </a>
          {/* <SfButton
            className="mr-auto block !px-2"
            type="button"
            slotPrefix={<SfIconMenu />}
            variant="tertiary"
          >
            <span className="hidden md:inline-flex">Categories</span>
          </SfButton> */}
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
