import { json } from "@remix-run/node";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import { useCart } from "~/hooks/use-cart";
import type { CheckoutFormValues } from "~/hooks/use-checkout";
import { checkoutFormSchema } from "~/hooks/use-checkout";
import { initCheckoutForm } from "~/hooks/use-checkout";
import { CommerceAPI } from "~/modules/api/commerce";
import AddressForm from "~/modules/checkout/components/AddressForm";
import DeliveryMethods from "~/modules/checkout/components/DeliveryMethods";
import OrderSummary from "~/modules/checkout/components/OrderSummary";
import PaymentMethods from "~/modules/checkout/components/PaymentMethods";
import { SfButton } from "@storefront-ui/react";
import { Link } from "@remix-run/react";
import { useAuth } from "~/hooks/user-auth";

const fetchMethods = async () => {
  const { data } = await CommerceAPI.shippingZones.list();
  const defaultZone = data.find((z) => z.name === "Việt Nam") || data[0];
  return await CommerceAPI.shippingZones.methods(defaultZone.id);
};
export const loader = async () => {
  const { data: shippingMethods } = await fetchMethods();
  const { data: paymentGateways } = await CommerceAPI.paymentGateways.list();
  return json({ shippingMethods, paymentGateways });
};
export default function CheckoutPage() {
  const { count, lines } = useCart();
  const { customer } = useAuth();
  const methods = useForm<CheckoutFormValues>({
    defaultValues: initCheckoutForm({ lines, customer }),
    resolver: yupResolver(checkoutFormSchema),
  });

  return (
    <>
      <Breadcrumbs links={[{ href: "/checkout", label: "Thanh toán" }]} />
      <div className="container mx-auto">
        {count <= 0 ? (
          <div className="flex min-h-[320px] w-full items-center justify-center rounded-md bg-neutral-100">
            <p>Giỏ hàng của bạn không có sản phẩm nào</p>
            <div>
              <SfButton as={Link} to="/">
                Tiếp tục mua sắm
              </SfButton>
            </div>
          </div>
        ) : (
          <FormProvider {...methods}>
            <div className="flex flex-wrap items-start">
              <div className="w-full md:w-8/12 md:pr-12">
                <AddressForm />
                <DeliveryMethods />
                <PaymentMethods />
              </div>
              <div className="sticky top-10 mt-10 w-full md:mt-0 md:w-4/12">
                <OrderSummary />
              </div>
            </div>
          </FormProvider>
        )}
      </div>
    </>
  );
}
