import { BaseAPI } from "~/modules/api/base";
import type { Product } from "~/types/product";

export class ProductAPI extends BaseAPI<Product> {
  constructor() {
    super({ baseURL: "/products" });
  }
}
