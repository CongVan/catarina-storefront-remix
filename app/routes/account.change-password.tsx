import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useMethods } from "react-use";
import { object, ref, string } from "yup";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { useAuth } from "~/hooks/user-auth";
import { CommerceAPI } from "~/modules/api/commerce";
import "~/utils/validation";

const schema = object({
  password: string()
    .required("Trường bắt buộc nhập")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Ít nhất 8 ký tự, ít nhất 1 ký tự viết hoa,ít nhất 1 ký tự viết thường, ít nhất 1 ký tự số hoặc ký tự đặt biệt"
    ),
  confirm_password: string()
    .required("Trường bắt buộc nhập")
    .oneOf([ref("password"), ""], "Nhập lại mật khẩu không trùng khớp"),
}).required();

export default function AccountChangePassword() {
  const { customer } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(schema),
  });

  const mutation = useMutation(
    async (body) => await CommerceAPI.customers.update(customer?.id, body),
    {
      onSuccess() {
        toast.success("Đổi mật khẩu thành công!");
      },
      onError() {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại sau!");
      },
    }
  );

  const onSubmit = (form) => {
    console.log("ok ", form);

    mutation.mutate({ password: form.password } as any);
  };
  return (
    <div>
      <div className="mb-5 font-semibold sf-headline-4">Đổi mật khẩu</div>
      <form className="grid max-w-xs grid-cols-1 gap-4">
        <Input
          label="Mật khẩu mới"
          required
          type="password"
          name="password"
          register={register}
          error={errors["password"]?.message}
        />
        <Input
          label="Nhập lại mật khẩu mới"
          required
          type="password"
          name="confirm_password"
          register={register}
          error={errors["confirm_password"]?.message}
        />
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="w-full"
          size="lg"
          loading={mutation.isLoading}
        >
          Xác nhận
        </Button>
      </form>
    </div>
  );
}

export const handle = {
  breadcrumb: { title: "Đổi mật khẩu" },
};
