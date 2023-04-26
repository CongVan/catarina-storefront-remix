import { BaseAPI } from "~/modules/api/base";
import type { ShippingMethod, ShippingZone } from "~/types/shipping-method";

export class ShippingZoneAPI extends BaseAPI<ShippingZone> {
  constructor() {
    super({ baseURL: "/shipping/zones" });
  }

  async methods(zoneId) {
    return await this.client.get<ShippingMethod[]>(
      this.resource(zoneId) + "/methods"
    );
  }
}
