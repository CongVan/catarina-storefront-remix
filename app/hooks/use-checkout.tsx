import type { Line } from "~/hooks/use-cart";
import type { CouponLine } from "~/types/coupon";
import type { Product } from "~/types/product";
import type { ProductVariant } from "~/types/product-variations";
import type { ShippingMethod } from "~/types/shipping-method";
import { object, string, array, setLocale } from "yup";
import type { Customer } from "~/types/user";

setLocale({
  mixed: {
    required(params) {
      return "Trường bắt buộc nhập";
    },
  },
});

export type CheckoutFormValues = {
  customer_id?: string;
  currency?: string;
  payment_method?: string;
  payment_method_title?: string;
  shipping_lines?: (Pick<ShippingMethod, "id" | "title"> & { total: string })[];
  customer_note?: string;
  coupon_lines?: CouponLine[];
  line_items: {
    product_id: Pick<Product, "id">["id"];
    variation_id: Pick<ProductVariant, "id">["id"];
    quantity: number;
  }[];
  billing?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    postcode?: string;
    country?: string;
    state?: string;
    address_1?: string;
    city?: string;
  };
};

export const checkoutFormSchema = object({
  customer_id: string(),
  currency: string(),
  payment_method: string().required(),
  payment_method_title: string().required(),
  shipping_lines: array().length(1).required(),
  customer_note: string(),
  coupon_lines: array().length(1),
  line_items: array().length(1).required(),
  billing: object({
    first_name: string().required().label("Họ"),
    last_name: string().required().label("Tên"),
    email: string().required().label("Email"),
    phone: string()
      .required()
      .matches(
        /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/i,
        "Số điện thoại không đúng định dạng"
      )
      .label("Số điện thại"),
    postcode: string().required(),
    country: string().required().label("Quốc gia"),
    state: string().required().label("Quận/Huyện"),
    address_1: string().required().label("Địa chỉ"),
    city: string().required().label("Thành phố"),
  }).required(),
}).required();

export const initCheckoutForm = ({
  lines,
  customer,
}: {
  lines: Line[];
  customer?: Customer | null;
}): CheckoutFormValues => {
  if (lines.length === 0) return { line_items: [] };
  return {
    customer_id: customer?.id,
    currency: "VND",
    line_items: lines.map((line) => ({
      product_id: line.productId,
      variation_id: line.variantId,
      quantity: line.quantity,
    })),
    billing: {
      first_name: "Văn",
      last_name: "Huỳnh Công",
      city: "Hồ chí Minh",
      phone: "0976345444",
      state: "Quận 9",
      address_1: "691 Đỗ Xuân Hợp",
      country: "VN",
      postcode: "70000",
      email: customer?.email,
    },
  };
};
