import qs from "qs";
import { r } from "vitest/dist/types-94cfe4b4";
import type { OrderStatus } from "~/types/order";
export const getBrand = (product: any) =>
  product?.attributes?.find((a: any) => a.name === "Thương hiệu")?.options[0];

export const getProductDetailLink = (productSlug, productId) => {
  return `/p/${productSlug}-${productId}`;
};

export const getCategoryDetailLink = (categorySlug, categoryId) => {
  return `/c/${categorySlug}-${categoryId}`;
};

export const getOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case "cancelled":
      return "Đã hủy";
    case "completed":
      return "Giao hàng thành công";
    case "pending":
      return "Chờ xử lý";
    case "on-hold":
      return "Đang giao hàng";
    case "refunded":
      return "Đã hoàn tiền";
    case "processing":
      return "Đang xử lý";
    case "failed":
      return "Thất bại";
    default:
      return "Đã xóa";
  }
};

export const parseQuery = (str) => {
  return qs.parse(str);
};

export const stringifyQuery = (params) => {
  return qs.stringify(params, { arrayFormat: "comma" });
};

export const metaTitle = (title = "") => {
  return ["CATARINA", title || "Nước hoa phong cách"].join(" | ");
};

export const metaDescription = (desc = "") => {
  return ["CATARINA", desc || "Nước hoa làm nên phong cách"].join(" | ");
};

export const getFullName = (first, last) => {
  if (first && last) {
    return first + " " + last;
  }
  return first || last || "";
};
