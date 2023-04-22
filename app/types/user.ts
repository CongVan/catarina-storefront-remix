import type { WooMetadata } from "~/types/common";

export type Customer = {
  id: string;
  email: string;
  meta_data: WooMetadata[];
  code: undefined;
};
