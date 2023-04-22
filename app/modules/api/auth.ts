import { BaseAPI } from "~/modules/api/base";
import type { Customer } from "~/types/user";
import { BASE_API_URL } from "~/utils/api";

export class AuthAPI extends BaseAPI<Customer> {
  constructor() {
    super({ baseURL: "" });
  }

  async login({ username, password }) {
    const { data } = await this.client({
      baseURL: BASE_API_URL + "/api/wp-json/jwt-auth/v1",
      url: "/token",
      method: "post",

      data: { username, password },
    });
    return data as { token: string };
  }
}
