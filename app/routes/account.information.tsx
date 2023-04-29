import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "@remix-run/react";
import { SfButton, SfInput } from "@storefront-ui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { object, string } from "yup";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { useAuth } from "~/hooks/user-auth";
import { CommerceAPI } from "~/modules/api/commerce";
import "~/utils/validation";
export const schema = object({
  billing: object({
    phone: string()
      .required()
      .matches(
        /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/i,
        "Số điện thoại không đúng định dạng"
      )
      .label("Số điện thại"),
  }).required(),
}).required();

export default function AccountInformationPage() {
  const { customer } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    ...(customer && {
      defaultValues: {
        ...customer,
        billing: { ...customer.billing, email: customer.email },
      },
    }),
  });
  console.log("errors", errors);

  const { isLoading, mutate } = useMutation(
    async (form: any) => {
      await CommerceAPI.customers.update(customer?.id, form);
    },
    {
      onSuccess() {
        toast.success("Lưu thông tin thành công!");
      },
      onError() {
        toast.error("Lưu thông tin thất bại.");
      },
    }
  );

  const onSubmit = (form) => {
    mutate(form);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container max-w-xl">
        <fieldset>
          <legend className="mb-2 font-semibold sf-headline-4">
            Thông tin tài khoản
          </legend>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-start gap-4">
              <Input
                label="Họ"
                register={register}
                name="last_name"
                groupClass="flex-1"
              />
              <Input
                label="Tên"
                register={register}
                name="first_name"
                groupClass="flex-1"
              />
            </div>
            <Input
              label="Email"
              disabled
              readOnly
              register={register}
              name="email"
            />
          </div>
        </fieldset>
        <fieldset className="mt-10 grid grid-cols-1 gap-2">
          <legend className="mb-2 font-semibold sf-headline-4">
            Thông tin giao hàng
          </legend>
          <div className="">
            <div className="w-full text-sm font-semibold">Người nhận</div>
            <div className="flex flex-wrap items-start gap-4">
              <Input
                label="Họ"
                register={register}
                name="billing.first_name"
                groupClass="flex-1"
              />
              <Input
                label="Tên"
                register={register}
                name="billing.last_name"
                groupClass="flex-1"
              />
            </div>
          </div>

          <Input
            label="Số điện thoại"
            name="billing.phone"
            register={register}
            error={errors?.billing?.phone && errors?.billing?.phone.message}
          />
          <div className="flex w-full items-start gap-4">
            <Input
              groupClass="flex-1"
              label="Tỉnh/ Thành Phố"
              name="billing.city"
              register={register}
            />
            <Input
              groupClass="flex-1"
              label="Quận/ Huyện"
              name="billing.state"
              register={register}
            />
          </div>
          <Input
            groupClass="flex-1"
            label="Địa chỉ"
            name="billing.address_1"
            register={register}
          />
        </fieldset>
        <div className="mt-5 flex justify-center">
          <Button type="submit" className="w-[240px]" loading={isLoading}>
            Lưu thông tin
          </Button>
        </div>
      </div>
    </form>
  );
}
