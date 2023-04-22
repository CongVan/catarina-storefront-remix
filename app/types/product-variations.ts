import type { Product } from "~/types/product";
import type { ProductAttribute } from "~/types/product-attribute";
import type { WooImage } from "~/types/product-image";

export type ProductVariant = Pick<
  Product,
  | "id"
  | "sku"
  | "price"
  | "regular_price"
  | "sale_price"
  | "on_sale"
  | "status"
  | "stock_status"
  | "stock_quantity"
  | "metadata"
> & {
  image: WooImage;
  attributes: Pick<ProductAttribute, "id" | "name"> &
    {
      option: string;
    }[];
};
