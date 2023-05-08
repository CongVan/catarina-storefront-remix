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
  userPromises: Promise<Maybe<Customer>>;
  ENV: { SITE_URL: string };
}

export type Maybe<T> = T | null;

export type CategoryQueryParams = {
  attribute?: string;
  attribute_term?: number;
} | null;
