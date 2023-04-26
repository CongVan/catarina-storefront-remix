import { BaseAPI } from "~/modules/api/base";
import type { Order } from "~/types/order";

export class OrderAPI extends BaseAPI<Order> {
  constructor() {
    super({ baseURL: "/orders" });
  }
}
