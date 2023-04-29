import { SfButton, SfInput, SfLoaderLinear } from "@storefront-ui/react";
import dayjs from "dayjs";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { CommerceAPI } from "~/modules/api/commerce";
import { formatCurrency } from "~/utils/currency";
const COUPON_ERROR = {
  invalid: "Mã giảm giá không đúng",
  require: "Vui lòng nhập mã giảm giá",
  expired: "Mã giảm giá đã hết hạn",
};
export const CouponInput: React.FC = () => {
  const { watch, setValue } = useFormContext();
  const couponLines = watch("coupon_lines");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<keyof typeof COUPON_ERROR | "">("");
  const [couponCode, setCouponCode] = useState(couponLines?.[0]?.code);
  const { data, isLoading } = useQuery(
    "/coupons-" + couponCode,
    async () => {
      if (!couponCode) return;
      const { data } = await CommerceAPI.coupons.list({
        params: {
          code: couponCode,
        },
      });
      const coupon = data[0];
      console.log("coupon", coupon);

      if (coupon) {
        if (dayjs.utc(coupon.date_expires).local().isBefore(dayjs())) {
          setError("expired");
          setValue("coupon_lines", []);
        } else {
          setError("");
          setValue("coupon_lines", [
            {
              id: coupon.id,
              code: coupon.code,
              discount: coupon.amount,
              description: coupon.description,
            },
          ]);
        }
      } else {
        setError("invalid");
        setValue("coupon_lines", []);
      }
    },
    { enabled: !!couponCode }
  );

  return (
    <>
      {couponLines?.[0] && (
        <div className="flex items-center border-t border-neutral-200 py-4">
          <p>Mã giảm giá</p>
          <SfButton
            size="sm"
            variant="tertiary"
            className="ml-auto mr-2"
            onClick={() => {
              setValue("coupon_lines", []);
              setCouponCode("");
            }}
          >
            Xóa
          </SfButton>
          <p className="font-semibold text-positive-600">
            -{formatCurrency(couponLines?.[0]?.discount)}
          </p>
        </div>
      )}
      <div className="mb-4 flex items-start gap-x-2 border-y border-neutral-200 py-4">
        <div className="grow">
          <SfInput
            id="coupon-code"
            placeholder="Nhập mã khuyến mãi"
            invalid={!!error}
            wrapperClassName="grow"
            onChange={(e) =>
              e.target.value ? setError("") : setError("require")
            }
          />
          {error && touched && (
            <small className="text-negative-500">{COUPON_ERROR[error]}</small>
          )}
        </div>
        <SfButton
          variant="secondary"
          disabled={isLoading}
          className="relative overflow-hidden"
          onClick={() => {
            setTouched(true);
            const value = (document.querySelector("#coupon-code") as any)
              ?.value;
            if (value) {
              setCouponCode(value);
            } else {
              setError("require");
            }
          }}
        >
          {isLoading && (
            <div className="absolute left-0 h-full w-full">
              <SfLoaderLinear
                ariaLabel="loading"
                className="h-full w-full bg-transparent text-primary-400 opacity-40"
                size="lg"
              />
            </div>
          )}
          Áp dụng
        </SfButton>
      </div>
    </>
  );
};
