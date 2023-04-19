export const getBrand = (product: any) =>
  product?.attributes?.find((a: any) => a.name === "Thương hiệu")?.options[0];
