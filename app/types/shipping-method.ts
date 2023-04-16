export interface ShippingLine {
  id: number;
  method_id: string;
  method_title: string;
  total: string;
  total_tax: string;
}

export interface ShippingMethod {
  id: string;
  title: string;
  description: string;
}
