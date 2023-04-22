import { AuthAPI } from "~/modules/api/auth";
import { CustomerAPI } from "~/modules/api/customer";
import { ProductAPI } from "~/modules/api/product";
import { ProductCategoriesAPI } from "~/modules/api/productCategory";

export const CommerceAPI = {
  products: new ProductAPI(),
  productCategories: new ProductCategoriesAPI(),
  customers: new CustomerAPI(),
  auth: new AuthAPI(),
};
