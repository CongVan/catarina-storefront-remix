import { useNavigate } from "@remix-run/react";
import { SfButton, SfLink, SfLoaderLinear } from "@storefront-ui/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { getCartMetaKey, useCart } from "~/hooks/use-cart";
import type { CheckoutFormValues } from "~/hooks/use-checkout";
import { useAuth } from "~/hooks/user-auth";
import { CommerceAPI } from "~/modules/api/commerce";
import { CouponInput } from "~/modules/checkout/components/CouponInput";
import { formatCurrency } from "~/utils/currency";

export default function OrderSummary() {
  const { count, lines, clear } = useCart();
  const { customer } = useAuth();
  const navigate = useNavigate();
  const { watch, handleSubmit } = useFormContext();
  const shippingLines = watch("shipping_lines");
  const couponLines = watch("coupon_lines");

  const summary = useMemo(() => {
    const [subTotal, subRegularTotal] = lines.reduce(
      (result, line) => {
        console.log("line", line);

        return [
          result[0] + line.quantity * +line.price,
          result[1] + line.quantity * +line.regular_price,
        ];
      },
      [0, 0]
    );

    const savingTotal = subRegularTotal - subTotal;
    return {
      subTotal,
      subRegularTotal,
      savingTotal,
    };
  }, [lines]);

  const total = useMemo(() => {
    const discount = +couponLines?.[0]?.discount || 0;
    const shippingFee = +shippingLines?.[0]?.total || 0;
    return summary.subTotal + shippingFee - discount;
  }, [summary.subTotal, couponLines, shippingLines]);

  const orderMutate = useMutation(async (body) => {
    const { data, error } = await CommerceAPI.orders.create(body);
    if (data?.id) {
      const d = await CommerceAPI.customers.batch({
        update: lines.map((line) => ({
          id: customer?.id,
          meta_data: [
            {
              key: getCartMetaKey(line.productId, line.variantId),
            },
          ],
        })),
      });
      clear();
      navigate("/order/" + data.id + "?SUCCESS");
    } else {
      toast.error(
        <div>
          <p>Đặt hàng thất bại.</p>
          <p>Vui lòng thử lại sau</p>
          <p>{error?.message}</p>
        </div>
      );
    }
  });

  const onSubmit = (form) => {
    const { billing, coupon_lines, ...formData } = form as CheckoutFormValues;
    const { email, phone, ...shipping } = billing || {};
    const coupons = couponLines?.map(({ code }) => ({ code }));
    const orderForm = {
      ...formData,
      billing,
      shipping,
      coupon_lines: coupons,
    };
    orderMutate.mutate(orderForm as any);
  };
  return (
    <div className="w-full md:rounded-md md:border md:border-neutral-100 md:shadow-lg">
      <div className="flex items-end justify-between bg-neutral-100 px-4 py-2 md:bg-transparent md:px-6 md:pb-4 md:pt-6">
        <p className="font-bold sf-headline-4 md:sf-headline-3">
          Tóm tắt đơn hàng
        </p>
        <p className="font-semibold sf-text-base">({count} sản phẩm)</p>
      </div>
      <div className="mt-3 px-4 pb-4 md:mt-0 md:px-6 md:pb-6">
        {lines.map((line) => {
          return (
            <div key={line.variantId + ""} className="flex flex-nowrap py-4">
              <img
                src={line.productImage}
                className="mr-1 h-14 w-14 min-w-[56px] object-contain"
                alt={line.productName}
              />
              <div className=" flex-1">
                <p className="text-sm">{line.productName}</p>
                <p className="text-sm text-neutral-500">
                  {line.attributes.map((a) => a.option).join(",")}
                </p>
              </div>
              <div className="ml-auto min-w-[120px] text-right">
                <div>
                  <span className="text-sm font-bold text-neutral-700">
                    {line.quantity} x
                  </span>
                  <span className="ml-1 font-semibold">
                    {formatCurrency(line.price)}
                  </span>
                </div>

                {line.sale_price && (
                  <div>
                    <span className="ml-1 text-sm font-semibold text-neutral-400 line-through">
                      {formatCurrency(line.regular_price)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 px-4 pb-4 md:mt-0 md:px-6 md:pb-6">
        <div className="flex flex-col pb-4 sf-text-base">
          <div className="flex items-baseline pb-4">
            <p className="text-lg font-semibold">Tạm tính</p>
            <p className="ml-auto text-lg font-semibold">
              {formatCurrency(summary.subTotal)}
            </p>
          </div>
          {summary.savingTotal > 0 && (
            <>
              <div className="flex items-baseline pb-2">
                <p className="grow  text-neutral-600">Giá gốc</p>
                <p className=" ml-auto font-normal text-neutral-600 line-through">
                  {formatCurrency(summary.subRegularTotal)}
                </p>
              </div>
              <div className="flex items-baseline text-secondary-700">
                <p className="grow  ">Tiết kiệm</p>
                <p className="ml-auto font-normal">
                  -{formatCurrency(summary.savingTotal)}
                </p>
              </div>
            </>
          )}
          <div className="flex items-baseline pb-4">
            <p className="">Phí vận chuyển</p>
            <p className="ml-auto">
              {shippingLines?.[0]?.total !== undefined ? (
                formatCurrency(shippingLines?.[0]?.total)
              ) : (
                <>Chọn hình thức vận chuyển</>
              )}
            </p>
          </div>
        </div>
        <CouponInput />
        <p className="mb-4 rounded-md bg-secondary-100 px-3 py-2.5 text-center text-secondary-700 sf-text-sm">
          Yeah!!! Bạn đã tiết kiệm được{" "}
          <span className="font-semibold">
            {formatCurrency(summary.savingTotal)}
          </span>
        </p>
        <div className="mb-4 flex items-end justify-between border-b border-neutral-200 pb-4 font-bold sf-headline-4 md:sf-headline-3">
          <p className="text-lg">Tổng tiền</p>
          <p className="text-2xl">{formatCurrency(total)}</p>
        </div>
        <SfButton
          size="lg"
          className="relative w-full overflow-hidden uppercase tracking-wider"
          color="secondary"
          disabled={orderMutate.isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {orderMutate.isLoading && (
            <div className="absolute left-0 h-full w-full">
              <SfLoaderLinear
                ariaLabel="loading"
                className="h-full w-full bg-transparent text-primary-400 opacity-40"
                size="lg"
              />
            </div>
          )}
          Đặt hàng
        </SfButton>
        <div className="mt-4 text-center sf-text-sm">
          Bằng việc đặt hàng, bạn sẽ đồng ý với <br />
          <SfLink href="/">Điều khoản dịch vụ</SfLink> và{" "}
          <SfLink href="/">Chính sách của chúng tôi.</SfLink>
        </div>
      </div>
    </div>
  );
}
