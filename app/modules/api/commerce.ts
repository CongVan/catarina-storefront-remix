import { AuthAPI } from "~/modules/api/auth";
import { CustomerAPI } from "~/modules/api/customer";
import { ProductAPI } from "~/modules/api/product";
import { ProductCategoriesAPI } from "~/modules/api/productCategory";
import { ProductVariantAPI } from "~/modules/api/productVariant";

export const CommerceAPI = {
  products: new ProductAPI(),
  productVariants: new ProductVariantAPI(),
  productCategories: new ProductCategoriesAPI(),
  customers: new CustomerAPI(),
  auth: new AuthAPI(),
};
