import type { WooMetadata } from "~/types/common";
import type { BillingAddress, ShippingAddress } from "~/types/order";

export type Customer = {
  id: string;
  email: string;
  meta_data: WooMetadata[];
  code: undefined;
  first_name?: string;
  last_name?: string;
  billing?: BillingAddress;
  shipping?: ShippingAddress;
};
