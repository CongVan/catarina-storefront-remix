import { Product } from '@/types/product';
import { ProductAttribute } from '@/types/product-attribute';
import { WooImage } from '@/types/product-image';

export type ProductVariation = Pick<
  Product,
  | 'id'
  | 'sku'
  | 'price'
  | 'regular_price'
  | 'sale_price'
  | 'on_sale'
  | 'status'
  | 'stock_status'
  | 'stock_quantity'
  | 'metadata'
> & {
  image: WooImage;
  attributes: Pick<ProductAttribute, 'id' | 'name'> &
    {
      option: string;
    }[];
};
