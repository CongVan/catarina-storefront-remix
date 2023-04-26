import { BaseAPI } from "~/modules/api/base";
import type { ShippingMethod } from "~/types/shipping-method";

export class ShippingMethodAPI extends BaseAPI<ShippingMethod> {
  constructor() {
    super({ baseURL: "/shipping_methods" });
  }
}
