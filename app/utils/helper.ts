export const getBrand = (product: any) =>
  product?.attributes?.find((a: any) => a.name === "Thương hiệu")?.options[0];

export const getProductDetailLink = (productSlug, productId) => {
  return `/p/${productSlug}-${productId}`;
};

export const getCategoryDetailLink = (categorySlug, categoryId) => {
  return `/c/${categorySlug}-${categoryId}`;
};
