import { BaseAPI } from "~/modules/api/base";
import type { Coupon } from "~/types/coupon";

export class CouponAPI extends BaseAPI<Coupon> {
  constructor() {
    super({ baseURL: "/coupons" });
  }
}
