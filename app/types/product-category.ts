import { WooImage } from '@/types/product-image';

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  image: WooImage;
  count: number;
  menu_order: number;
}
