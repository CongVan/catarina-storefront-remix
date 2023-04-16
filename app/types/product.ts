import type { ProductAttribute } from "@/types/product-attribute";
import type { Category } from "@/types/product-category";
import type { WooImage } from "@/types/product-image";
import type { Tag } from "@/types/product-tag";

export type StockStatus = "instock" | "outofstock" | "onbackorder";
export type ProductStatus = "draft" | "pending" | "private" | "publish";
export type ProductType = "simple" | "grouped" | "external" | "variable";

export interface ProductMetadata {
  id: number;
  key: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  featured: boolean;
  short_description: string;
  status: ProductStatus;
  stock_status: StockStatus;
  reviews_allowed: boolean;
  rating_count: number;
  type: ProductType;
  related_ids: number[];
  categories: Category[];
  tags: Tag[];
  images: WooImage[];
  attributes: ProductAttribute[];
  default_attributes: ProductAttribute[];
  on_sale: boolean;
  total_sales: boolean;
  stock_quantity: number;
  average_rating: number;
  price_html: string;
  metadata: ProductMetadata[];
  variations: number[];
}

export interface ProductsByCategory {
  category: Category;
  products: Product[];
}
