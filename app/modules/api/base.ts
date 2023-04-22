import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosError } from "axios";
import type { WooResponse } from "~/types/common";
import { getClient } from "~/utils/api";

export class BaseAPI<T> {
  protected baseURL: string = "";
  protected client: AxiosInstance;

  constructor({ baseURL }) {
    this.baseURL = baseURL;
    this.client = getClient();
  }

  resource(url?: string) {
    return [this.baseURL, url].join("/");
  }

  async list(config?: AxiosRequestConfig) {
    const { data, headers } = await this.client.get<T[]>(
      this.resource(),
      config
    );
    console.log("headers", headers);

    const total = +(headers["x-wp-total"] + "");
    const totalPage = +(headers["x-wp-totalpages"] + "");

    const meta = {
      total,
      totalPage,
      ...(config?.params?.page && { page: config?.params?.page }),
    } as WooResponse<T>["meta"];
    console.log("meta", meta);

    return {
      data,
      meta,
    };
  }

  async detail(id, config?: AxiosRequestConfig) {
    if (!id) {
      throw new AxiosError("id is require");
    }
    const { data } = await this.client.get<T>(this.resource(id), config);
    return { data };
  }

  async update(id, body, config?: AxiosRequestConfig) {
    if (!id) {
      throw new AxiosError("id is require");
    }
    const { data } = await this.client.put<T>(this.resource(id), body, config);
    return { data };
  }

  async create(body, config?: AxiosRequestConfig) {
    try {
      const { data } = await this.client.post<T>(this.resource(), body, config);

      return { data };
    } catch (error: any) {
      return { error: error?.response?.data };
    }
  }
}
