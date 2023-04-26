// import ApplePayLogo from "@assets/apple-pay-logo.svg";
// import GooglePayLogo from "@assets/google-pay-logo.svg";
// import PayPalLogo from "@assets/paypal-logo.svg";
// import VisaLogo from "@assets/visa-logo.svg";

import { useLoaderData } from "@remix-run/react";
import { useFormContext } from "react-hook-form";
import type { loader } from "~/routes/checkout";

// List of payment methods
const paymentMethods = [
  {
    label: "Credit card",
    value: "credit-card",
    logo: "VisaLogo",
    active: true,
  },
  {
    label: "PayPal",
    value: "paypal",
    logo: "PayPalLogo",
    active: true,
  },
  {
    label: "ApplePay",
    value: "applepay",
    logo: "ApplePayLogo",
    active: true,
  },
  {
    label: "GooglePay",
    value: "googlepay",
    logo: "GooglePayLogo",
    active: false,
  },
];

export default function PaymentMethods() {
  const { paymentGateways } = useLoaderData<typeof loader>();
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  return (
    <fieldset>
      <legend className="mb-4 flex w-full items-center font-bold text-neutral-900 sf-headline-5">
        <span>Hình thức thanh toán</span>
        {errors["payment_method"] && (
          <span className="ml-auto font-semibold text-negative-600">
            Chọn hình thức thanh toán
          </span>
        )}
      </legend>

      <div className="grid grid-cols-1 items-stretch gap-4">
        {paymentGateways
          .filter((s) => s.enabled)
          .map(({ title, id, description, enabled }) => (
            <label key={id} className="relative">
              <input
                disabled={!enabled}
                type="radio"
                name="payment_method"
                value={id}
                className="peer sr-only"
                onChange={(e) => {
                  if (e.target.checked) {
                    setValue("payment_method", id, { shouldValidate: true });
                    setValue("payment_method_title", title, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
              <div className="h-full cursor-pointer rounded-md border border-neutral-200 px-4 py-4 -outline-offset-2 hover:border-primary-200 hover:bg-primary-100 active:border-primary-300 active:bg-primary-200 peer-checked:outline-2 peer-checked:outline peer-checked:outline-primary-700 peer-focus:border-primary-200 peer-focus:bg-primary-100 peer-disabled:cursor-not-allowed peer-disabled:border-neutral-200 peer-disabled:bg-neutral-100 peer-disabled:opacity-50 peer-disabled:[&_img]:grayscale">
                <p className="mb-2 font-semibold text-neutral-900">{title}</p>
                <p className="whitespace-pre-wrap text-neutral-700">
                  {description}
                </p>
              </div>
            </label>
          ))}
      </div>
    </fieldset>
  );
}
