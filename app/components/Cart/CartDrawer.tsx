import {
  SfButton,
  SfDrawer,
  SfIconClose,
  SfLoaderCircular,
  SfTooltip,
  useTrapFocus,
} from "@storefront-ui/react";
import {
  IconShoppingBag,
  IconShoppingCart,
  IconShoppingCartOff,
} from "@tabler/icons-react";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { twMerge } from "tailwind-merge";
import { useCart } from "~/hooks/use-cart";
import { useTheme } from "~/context/theme";
import { useAuth } from "~/hooks/user-auth";
import { ProductCartList } from "~/modules/product/components/ProductCartList";

export const CartDrawer: React.FC = () => {
  const { isShowCartModal, toggleCartModal, showLogin } = useTheme();
  const { customer } = useAuth();
  const { count, isLoading } = useCart();

  const nodeRef = useRef(null);
  const drawerRef = useRef(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useTrapFocus(drawerRef, { activeState: isShowCartModal });
  return (
    <>
      <SfTooltip label="Giỏ hàng" placement="bottom">
        <SfButton
          className={twMerge(
            "relative -ml-0.5 mr-2 text-primary-700 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200 active:text-primary-700"
          )}
          aria-label="Giỏ hàng"
          variant="tertiary"
          slotPrefix={<IconShoppingBag />}
          square
          onClick={() => toggleCartModal(true)}
        >
          {+(count + "") > 0 && (
            <span className=" absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-negative-500 text-center text-xs text-white">
              {count}
            </span>
          )}
        </SfButton>
      </SfTooltip>
      {/* Backdrop */}
      <CSSTransition
        in={isShowCartModal}
        nodeRef={backdropRef}
        timeout={200}
        unmountOnExit
        classNames={{
          enter: "opacity-0",
          enterDone: "opacity-100 transition duration-200 ease-out",
          exitActive: "opacity-0 transition duration-200 ease-out",
        }}
      >
        <div
          ref={backdropRef}
          className="fixed inset-0 z-10 bg-neutral-700 bg-opacity-50"
        />
      </CSSTransition>
      <CSSTransition
        ref={nodeRef}
        in={isShowCartModal}
        timeout={300}
        unmountOnExit
        classNames={{
          enter: "translate-x-0",
          enterActive: "translate-x-0 transition duration-500 ease-in-out",
          exitDone: "translate-x-full",
          exitActive: "translate-x-full transition duration-300 ease-in-out",
        }}
      >
        <SfDrawer
          ref={drawerRef}
          open
          placement="right"
          onClose={() => toggleCartModal(false)}
          className="max-w-screen z-50 flex h-screen w-[370px] flex-col bg-white"
        >
          <header className="flex items-center justify-between bg-primary-700 px-5 py-6">
            <div className="flex items-center text-xl text-white">
              <IconShoppingBag className="mr-2" /> Giỏ hàng của bạn
            </div>
            <SfButton
              square
              variant="tertiary"
              onClick={() => {
                toggleCartModal(!isShowCartModal);
              }}
              className="text-white"
            >
              <SfIconClose />
            </SfButton>
          </header>
          <div className="relative flex h-full flex-1 flex-col overflow-auto bg-white">
            {isLoading && (
              <div className="absolute inset-0 z-[1] flex items-center justify-center bg-black bg-opacity-30">
                <SfLoaderCircular size="lg" />
              </div>
            )}
            {customer ? (
              count > 0 ? (
                <>
                  <div className=" flex-1 p-5 px-5">
                    <div className="mb-2 font-normal">
                      Bạn có <strong className="font-bold">{count}</strong> sản
                      phẩm trong giỏ hàng
                    </div>
                    <div className="">
                      <ProductCartList />
                    </div>
                  </div>

                  <SfButton
                    variant="primary"
                    slotPrefix={<IconShoppingCart />}
                    size="lg"
                    className="mt-auto w-full rounded-none px-4 py-6 uppercase"
                  >
                    Thanh toán ngay
                  </SfButton>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 p-5 text-center">
                  <IconShoppingCartOff className="h-10 w-10 text-primary-600" />
                  <div className=" sf-headline-5">
                    Bạn không có sản phẩm nào trong giỏ hàng
                  </div>
                  <SfButton
                    className="mt-5"
                    onClick={() => toggleCartModal(false)}
                    size="lg"
                  >
                    Tiếp tục mua sắm
                  </SfButton>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 p-5 text-center">
                <IconShoppingCartOff className="h-10 w-10 text-primary-600" />
                <div className=" sf-headline-5">
                  Bạn không có sản phẩm nào trong giỏ hàng
                </div>
                <SfButton
                  className="mt-5"
                  onClick={() => showLogin()}
                  size="lg"
                >
                  Đăng nhập để xem giỏ hàng
                </SfButton>
              </div>
            )}
          </div>
        </SfDrawer>
      </CSSTransition>
    </>
  );
};
