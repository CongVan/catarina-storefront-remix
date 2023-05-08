import { BaseAPI } from "~/modules/api/base";
import type {
  ProductAttribute,
  ProductAttributeTerm,
} from "~/types/product-attribute";

export class ProductAttributeTermsAPI extends BaseAPI<ProductAttributeTerm> {
  constructor() {
    super({ baseURL: "/products/attributes", suffixURL: "terms" });
  }
}
