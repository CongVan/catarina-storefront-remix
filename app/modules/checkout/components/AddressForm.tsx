import { useFormContext } from "react-hook-form";
import { Input } from "~/components/Input";
import type { CheckoutFormValues } from "~/hooks/use-checkout";

export default function AddressForm() {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext<CheckoutFormValues>();

  return (
    <fieldset className="mb-4">
      <div className="flex flex-col gap-4">
        <legend className="font-bold text-neutral-900 sf-headline-5">
          Thông tin đặt hàng
        </legend>
        <div className="flex items-start gap-4">
          <Input
            groupClass="flex-1"
            label="Họ"
            name="billing.last_name"
            autoFocus
            required
            register={register}
            error={
              errors?.billing?.last_name && errors?.billing?.last_name.message
            }
          />
          <Input
            groupClass="flex-1"
            label="Tên"
            required
            name="billing.first_name"
            register={register}
            error={
              errors?.billing?.first_name && errors?.billing?.first_name.message
            }
          />
        </div>

        <Input
          groupClass="flex w-full flex-grow flex-col gap-1 md:w-auto"
          label="Số điện thoại"
          name="billing.phone"
          required
          register={register}
          error={errors?.billing?.phone && errors?.billing?.phone.message}
        />

        <div className="flex w-full items-start gap-4">
          <Input
            groupClass="flex-1"
            label="Tỉnh/ Thành Phố"
            required
            name="billing.city"
            register={register}
            error={errors?.billing?.city && errors?.billing?.city.message}
          />
          <Input
            groupClass="flex-1"
            label="Quận/ Huyện"
            required
            name="billing.state"
            register={register}
            error={errors?.billing?.state && errors?.billing?.state.message}
          />
        </div>
        <Input
          groupClass="flex-1"
          label="Địa chỉ"
          name="billing.address_1"
          required
          register={register}
          error={
            errors?.billing?.address_1 && errors?.billing?.address_1.message
          }
        />

        <div className="flex w-full flex-grow flex-col gap-1 md:w-auto">
          <label>
            <span className="mb-1 text-sm font-medium">Ghi chú</span>
            <textarea
              className="mt-1 w-full rounded border border-neutral-200 p-2.5 hover:border-primary-500 focus:outline-primary-600"
              rows={4}
              {...register("customer_note", {})}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
