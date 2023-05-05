import { BaseAPI } from "~/modules/api/base";
import type { ProductReview } from "~/types/product-review";

export class ProductReviewAPI extends BaseAPI<ProductReview> {
  constructor() {
    super({ baseURL: "/products/reviews" });
  }
}
