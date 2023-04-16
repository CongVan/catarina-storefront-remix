import { Address } from '@/types/order';

export interface CheckoutFormValues extends Address {
  note: string;
}
