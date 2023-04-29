import type { WooMetadata } from "~/types/common";
export const ORDER_STATUS = [
  "pending",
  "processing",
  "on-hold",
  "completed",
  "cancelled",
  "refunded",
  "failed",
  "trash",
] as const;

export type OrderStatus = (typeof ORDER_STATUS)[number];

export interface Address {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export type BillingAddress = Address;
export type ShippingAddress = Address;
export interface OrderLine {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  image: { src: string };
  readonly subtotal_tax: string;
  total: string;
  readonly total_tax: string;
  meta_data: WooMetadata[];
  readonly sku: string;
  readonly price: string;
}

export interface OrderShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  total: string;
  total_tax: string;
  meta_data: WooMetadata;
}

export interface OrderFeeLine {
  id: number;
  name: string;
  tax_class: string;
  tax_status: "taxable" | "none";
  total: string;
  total_tax: string;
  meta_data: WooMetadata;
}

export interface OrderCouponLine {
  id: number;
  code: string;
  discount: string;
  discount_tax: string;
  meta_data: WooMetadata;
}

export interface Order {
  id: number;
  readonly number: string;
  readonly order_key: string;
  readonly created_via: string;
  status: OrderStatus;
  currency: string;
  readonly date_created: string;
  readonly date_create_gmt: string;
  readonly discount_total: string;
  readonly discount_tax: string;
  readonly shipping_total: string;
  readonly shipping_tax: string;
  readonly cart_tax: string;
  readonly total: string;
  readonly total_tax: string;
  readonly prices_include_tax: boolean;
  customer_id: number;
  readonly customer_ip_address: string;
  customer_note: string;
  billing: BillingAddress;
  shipping: ShippingAddress;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  meta_data: WooMetadata[];
  line_items: Partial<OrderLine>[];
  shipping_lines: Partial<OrderShippingLine>[];
  fee_lines: OrderFeeLine[];
  coupon_lines: Partial<OrderCouponLine>[];
  readonly set_paid: boolean;
}
