import axios from "axios";
import type { WooResponse } from "~/types/common";
import qs from "qs";

type Params = {
  params?: Record<string, any>;
  init?: RequestInit;
};
export const $fetch = async <T>(url: string, { params, init }: Params = {}) => {
  const baseUrl =
    typeof window === "undefined" ? process.env.SITE_URL : window.ENV.SITE_URL;

  const _url = `${baseUrl}/api${url}${
    params ? "?" + qs.stringify(params || {}, { arrayFormat: "comma" }) : ""
  }`;

  const response = await fetch(_url, init);
  const total = +(response.headers.get("X-WP-Total") + "");
  const totalPage = +(response.headers.get("X-WP-TotalPages") + "");
  const meta = {
    total,
    totalPage,
    ...(params?.page && { page: params?.page }),
  } as WooResponse<T>["meta"];
  const data = (await response.json()) as T;
  return { data, meta } as WooResponse<T>;
};
