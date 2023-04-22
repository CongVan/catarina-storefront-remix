import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
  useRevalidator,
  useRouteLoaderData,
} from "@remix-run/react";
import {
  SfButton,
  SfCheckbox,
  SfIconClose,
  SfInput,
  SfLink,
  SfLoaderLinear,
  SfModal,
} from "@storefront-ui/react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useId, useMemo, useRef } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { CSSTransition } from "react-transition-group";
import AlertError from "~/components/AlertError";
import { useTheme } from "~/context/theme";

export const LoginModal: React.FC = () => {
  const { ENV } = useRouteLoaderData("root") as any;
  const { authModal, closeModal, showRegister } = useTheme();

  const [success, setSuccess] = useState(false);
  const headingId = useId();
  const descriptionId = useId();
  const modalRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const revalidator = useRevalidator();

  const mutation = useMutation(async (formData: FormData) => {
    const pathname = ENV.SITE_URL + "/login";
    console.log("path", pathname);

    const response = await fetch(pathname, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.success) {
      revalidator.revalidate();

      setSuccess(true);
    }
    return data;
  });

  const isOpen = useMemo(() => {
    return authModal === "login";
  }, [authModal]);

  useEffect(() => {
    if (success && revalidator.state === "idle") {
      closeModal();
      toast.success("Đăng nhập thành công");
    }
  }, [success, revalidator.state, closeModal]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    mutation.mutate(form);
  };

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
          className="z-50 min-w-[320px] max-w-lg md:min-w-[420px]"
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
          <div className="w-full py-5">
            {mutation.data?.error && (
              <AlertError className="mb-2" message={mutation.data.error} />
            )}
            <form
              className="space-y-4"
              // action="/login"
              // method="POST"
              onSubmit={(e) => onSubmit(e)}
            >
              <label className="mt-4 flex w-full flex-grow flex-col gap-0.5 md:mt-0 md:w-auto">
                <span className="mb-1 sf-text-sm">Email</span>
                <SfInput
                  name="email"
                  type={"email"}
                  autoComplete="email"
                  className="w-full"
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
                    Ghi nhớ{" "}
                    <span className="hidden md:inline-flex">đăng nhập</span>
                  </label>
                </div>
                <SfLink as={Link} to={"/forgot-password"} className="text-sm">
                  Quên mật khẩu
                </SfLink>
              </div>
              <SfButton
                disabled={mutation.isLoading || revalidator.state === "loading"}
                type="submit"
                variant="primary"
                className="relative w-full overflow-hidden"
              >
                {(mutation.isLoading || revalidator.state === "loading") && (
                  <div className="absolute left-0 h-full w-full">
                    <SfLoaderLinear
                      ariaLabel="loading"
                      className="h-full w-full bg-transparent text-primary-400 opacity-40"
                      size="lg"
                    />
                  </div>
                )}
                Đăng nhập
              </SfButton>
              <div className="text-sm font-medium text-neutral-500">
                Bạn chưa có tài khoản?{" "}
                <SfLink as="a" className="" onClick={showRegister}>
                  Đăng ký ngay
                </SfLink>
              </div>
            </form>
          </div>
        </SfModal>
      </CSSTransition>
    </>
  );
};
