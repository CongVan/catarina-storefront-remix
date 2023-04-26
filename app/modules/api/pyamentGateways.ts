import { BaseAPI } from "~/modules/api/base";
import type { PaymentGateway } from "~/types/payment-gateway";
export class PaymentGatewaysAPI extends BaseAPI<PaymentGateway> {
  constructor() {
    super({ baseURL: "/payment_gateways" });
  }
}
