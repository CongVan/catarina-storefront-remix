import { AuthAPI } from "~/modules/api/auth";
import { CouponAPI } from "~/modules/api/coupon";
import { CustomerAPI } from "~/modules/api/customer";
import { OrderAPI } from "~/modules/api/order";
import { ProductAPI } from "~/modules/api/product";
import { ProductCategoriesAPI } from "~/modules/api/productCategory";
import { ProductVariantAPI } from "~/modules/api/productVariant";
import { PaymentGatewaysAPI } from "~/modules/api/pyamentGateways";
import { ShippingMethodAPI } from "~/modules/api/shippingMethods";
import { ShippingZoneAPI } from "~/modules/api/shippingZones";

export const CommerceAPI = {
  products: new ProductAPI(),
  productVariants: new ProductVariantAPI(),
  productCategories: new ProductCategoriesAPI(),
  customers: new CustomerAPI(),
  shippingMethods: new ShippingMethodAPI(),
  shippingZones: new ShippingZoneAPI(),
  paymentGateways: new PaymentGatewaysAPI(),
  auth: new AuthAPI(),
  coupons: new CouponAPI(),
  orders: new OrderAPI(),
};
