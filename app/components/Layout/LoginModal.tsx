import { Form, Link, useLocation } from "@remix-run/react";
import {
  SfButton,
  SfCheckbox,
  SfIconClose,
  SfInput,
  SfLink,
  SfModal,
} from "@storefront-ui/react";
import { useId, useMemo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "~/context/theme";

export const LoginModal: React.FC = () => {
  const { authModal, closeModal, showRegister } = useTheme();
  const headingId = useId();
  const descriptionId = useId();
  const modalRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isOpen = useMemo(() => {
    return authModal === "login";
  }, [authModal]);
  return (
    <>
      {/* Backdrop */}
      <CSSTransition
        in={isOpen}
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

      {/* Modal */}
      <CSSTransition
        in={isOpen}
        nodeRef={modalRef}
        timeout={200}
        unmountOnExit
        classNames={{
          enter: "translate-y-10 opacity-0",
          enterDone:
            "translate-y-0 opacity-100 transition duration-200 ease-out",
          exitActive:
            "translate-y-10 opacity-0 transition duration-200 ease-out",
        }}
      >
        <SfModal
          open
          onClose={closeModal}
          ref={modalRef}
          as="section"
          role="alertdialog"
          aria-labelledby={headingId}
          aria-describedby={descriptionId}
          className="z-50  max-w-[90%] md:max-w-lg"
        >
          <header>
            <SfButton
              square
              variant="tertiary"
              className="absolute right-2 top-2"
              onClick={closeModal}
            >
              <SfIconClose />
            </SfButton>
            <h3
              id={headingId}
              className="font-bold uppercase sf-headline-4 md:sf-headline-3"
            >
              Đăng nhập
            </h3>
          </header>
          <div className="min-w-[320px] py-5">
            <Form
              className="space-y-4"
              action="/login"
              method="POST"
              reloadDocument
            >
              <label className="mt-4 flex w-full flex-grow flex-col gap-0.5 md:mt-0 md:w-auto">
                <span className="mb-1 sf-text-sm">Email</span>
                <SfInput
                  name="email"
                  type={"email"}
                  autoComplete="email"
                  required
                />
              </label>
              <label className="mt-4 flex w-full flex-grow flex-col gap-0.5 md:mt-0 md:w-auto">
                <span className="mb-1 sf-text-sm">Mật khẩu</span>
                <SfInput
                  name="password"
                  type={"password"}
                  autoComplete="password"
                  required
                />
              </label>
              <input
                type="hidden"
                name="redirectTo"
                value={location.pathname}
              />
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <SfCheckbox id="remember" defaultChecked />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-medium text-neutral-500"
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <SfLink as={Link} to={"/forgot-password"} className="text-sm">
                  Quên mật khẩu
                </SfLink>
              </div>
              <SfButton type="submit" variant="primary" className="w-full">
                Đăng nhập
              </SfButton>
              <div className="text-sm font-medium text-neutral-500">
                Bạn chưa có tài khoản?{" "}
                <SfLink as="a" className="" onClick={showRegister}>
                  Đăng ký ngay
                </SfLink>
              </div>
            </Form>
          </div>
        </SfModal>
      </CSSTransition>
    </>
  );
};
