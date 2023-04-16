export interface ProductAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  slug: string;
  variation: boolean;
  options: string[];
}

export interface ProductAttributeTerm {
  id: number;
  name: string;
  slug: string;
  description: string;
  menu_order: string;
  count: number;
}

export type ProductDefaultAttribute = Pick<
  ProductAttribute,
  'id' | 'name' | 'options'
>;
