import { BaseAPI } from "~/modules/api/base";
import type { ProductVariant } from "~/types/product-variations";

export class ProductVariantAPI extends BaseAPI<ProductVariant> {
  constructor() {
    super({ baseURL: "/products", suffixURL: "variations" });
  }
}
