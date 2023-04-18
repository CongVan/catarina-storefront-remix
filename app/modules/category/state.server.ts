import type { Category } from "~/types/product-category";

let categories: Category[] = [];

export const setCategories = (s: Category[]) => (categories = s);
export const getCategories = () => categories;
