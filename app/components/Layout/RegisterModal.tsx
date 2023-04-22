import {
  Form,
  Link,
  useLocation,
  useNavigate,
  useRevalidator,
  useRouteLoaderData,
} from "@remix-run/react";
import {
  SfModal,
  SfButton,
  SfIconClose,
  SfInput,
  SfCheckbox,
  SfLink,
  SfLoaderLinear,
} from "@storefront-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { useId, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { CSSTransition } from "react-transition-group";
import AlertError from "~/components/AlertError";
import { useTheme } from "~/context/theme";

export const RegisterModal: React.FC = () => {
  const { ENV } = useRouteLoaderData("root") as any;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { authModal, closeModal, showLogin } = useTheme();
  const headingId = useId();
  const descriptionId = useId();
  const modalRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const revalidator = useRevalidator();
  const [success, setSuccess] = useState(false);

  const isOpen = useMemo(() => {
    return authModal === "register";
  }, [authModal]);

  const mutation = useMutation(async (formData: FormData) => {
    const response = await fetch(ENV.SITE_URL + "/register", {
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

  const onSubmit = async (data) => {
    const form = new FormData();
    Object.entries(data).map(([key, value]) => {
      form.append(key, value as any);
    });
    mutation.mutate(form);
  };

  useEffect(() => {
    if (success && revalidator.state === "idle") {
      closeModal();
      toast.success("Đăng ký thành công");
    }
  }, [success, revalidator.state, closeModal]);

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
          className="z-50 min-w-[320px] max-w-[320px] md:min-w-[420px] md:max-w-[420px]"
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
              Đăng ký
            </h3>
          </header>
          <div className="w-full py-5">
            <form className="space-y-4">
              {!!mutation?.data?.error && (
                <AlertError
                  className="mb-2"
                  message={mutation.data.error + ""}
                />
              )}
              <label className="mt-4 flex w-full flex-grow flex-col gap-0.5 md:mt-0 md:w-auto">
                <span className="mb-1 sf-text-sm">Email</span>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Vui lòng nhập mật khẩu" }}
                  render={({ field }) => (
                    <>
                      <SfInput
                        type={"email"}
                        invalid={!!errors.email}
                        {...register("email")}
                      />
                      {errors.email?.message && (
                        <p className="mt-0.5 text-sm font-medium text-negative-700">
                          {errors.email?.message &&
                            errors.email.message.toString()}
                        </p>
                      )}
                    </>
                  )}
                />
              </label>
              <label className="mt-4 flex w-full flex-grow flex-col gap-0.5 md:mt-0 md:w-auto">
                <span className="mb-1 sf-text-sm">Mật khẩu</span>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Vui lòng nhập mật khẩu" }}
                  render={({ field }) => (
                    <>
                      <SfInput
                        type={"password"}
                        invalid={!!errors.password}
                        {...field}
                      />
                      {errors.password?.message && (
                        <p className="mt-0.5 text-sm font-medium text-negative-700">
                          {errors.password?.message &&
                            errors.password.message.toString()}
                        </p>
                      )}
                    </>
                  )}
                />
              </label>
              <input
                name="redirectTo"
                value={location.pathname}
                type="hidden"
              />
              <label className="mt-4 flex w-full flex-grow flex-col gap-0.5 md:mt-0 md:w-auto">
                <span className="mb-1 sf-text-sm">Nhập lại mật khẩu</span>
                <Controller
                  name="confirm_password"
                  control={control}
                  rules={{ required: "Vui lòng nhập lại mật khẩu" }}
                  render={({ field }) => (
                    <>
                      <SfInput
                        type={"password"}
                        invalid={!!errors.confirm_password}
                        {...field}
                      />
                      {errors.confirm_password?.message && (
                        <p className="mt-0.5 text-sm font-medium text-negative-700">
                          {errors.confirm_password?.message &&
                            errors.confirm_password.message.toString()}
                        </p>
                      )}
                    </>
                  )}
                />
                {/* <SfInput name="confirm_password" type={"password"} required /> */}
              </label>
              <div className="flex justify-end">
                <SfLink as={Link} to={"/forgot-password"} className="text-sm">
                  Quên mật khẩu
                </SfLink>
              </div>
              <SfButton
                type="button"
                variant="primary"
                className="relative w-full overflow-hidden"
                disabled={mutation.isLoading || revalidator.state === "loading"}
                onClick={handleSubmit(onSubmit)}
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
                Đăng ký
              </SfButton>
              <div className="text-sm font-medium text-neutral-500">
                Bạn đã có tài khoản?{" "}
                <SfLink as="a" className="" onClick={showLogin}>
                  Đăng nhập
                </SfLink>
              </div>
            </form>
          </div>
        </SfModal>
      </CSSTransition>
    </>
  );
};
