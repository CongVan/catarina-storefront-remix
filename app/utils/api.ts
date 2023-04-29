import type { AxiosInstance } from "axios";
import axios from "axios";
import qs from "qs";
let client: AxiosInstance;

export const BASE_API_URL =
  typeof window === "undefined" ? process.env.SITE_URL : window.ENV.SITE_URL;

export const getClient = () => {
  if (client) return client;
  client = axios.create({
    baseURL: BASE_API_URL + "/api/wp-json/wc/v3",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: "indices" });
    },
  });
  return client;
};
