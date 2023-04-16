export interface CouponLine {
  id: number;
  code: string;
  discount: string;
  discount_tax: string;
  description: string;
}

export interface Coupon {
  id: number;
  code: string;
  amount: string;
  description: string;
  discount_type: 'percent' | 'fixed_cart' | 'fixed_product';
}
