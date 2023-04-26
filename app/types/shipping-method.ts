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
  enabled: boolean;
  method_id: string;
  method_title: string;
  settings?: {
    cost?: { value: string };
  };
}

export interface ShippingZone {
  id: string;
  name: string;
}
