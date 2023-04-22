import type { Category } from "~/types/product-category";
import type { Customer } from "~/types/user";

export interface WooResponse<T> {
  data: T;
  meta: {
    page?: number;
    total: number;
    totalPage: number;
  };
}

export interface WooMetadata {
  id: number;
  key: string;
  value: string;
}

export interface RootLoaderData {
  categories: Category[];
  user: Customer | null;
  ENV: { SITE_URL: string };
}
