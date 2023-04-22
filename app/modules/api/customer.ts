import { BaseAPI } from "~/modules/api/base";
import type { Customer } from "~/types/user";

export class CustomerAPI extends BaseAPI<Customer> {
  constructor() {
    super({ baseURL: "/customers" });
  }
}
