import { BaseAPI } from "~/modules/api/base";
import type { ProductAttribute } from "~/types/product-attribute";

export class ProductAttributesAPI extends BaseAPI<ProductAttribute> {
  constructor() {
    super({ baseURL: "/products/attributes" });
  }
}
