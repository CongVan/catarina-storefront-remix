export const formatCurrency = (amount: number | string, locale = "vi-VN") => {
  return Intl.NumberFormat(locale, {
    currency: "VND",
    style: "currency",
  }).format(+amount);
};
