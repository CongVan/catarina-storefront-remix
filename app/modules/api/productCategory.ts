import { BaseAPI } from "~/modules/api/base";
import type { Category } from "~/types/product-category";

export class ProductCategoriesAPI extends BaseAPI<Category> {
  constructor() {
    super({ baseURL: "/products/categories" });
  }
}
