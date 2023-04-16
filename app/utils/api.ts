import axios from "axios";
import qs from "qs";

export const Api = axios.create({
  baseURL: process.env.WOO_API,
  headers: {
    "Content-Type": "application/json",
  },
  auth: {
    username: process.env.WOO_KEY || "",
    password: process.env.WOO_SECRET || "",
  },
  timeout: 5000,
});

type Params = {
  params?: Record<string, any>;
  init?: RequestInit;
};

export const $fetch = <T>(url: string, { params, init }: Params) => {
  const headers = new Headers({
    Authorization: `Basic ${Buffer.from(
      `${process.env.WOO_KEY}:${process.env.WOO_SECRET}`
    ).toString("base64")}`,
  });

  if (typeof init?.headers?.forEach === "function") {
    init.headers.forEach((value, key) => {
      headers.append(key + "", value + "");
    });
  }
  const _url =
    process.env.WOO_API +
    url +
    (params ? `?${qs.stringify(params || {})}` : "");
  console.log("_url", _url);

  return fetch(_url, { headers })
    .then((s) => s.json())
    .then((s) => s as T);
};
