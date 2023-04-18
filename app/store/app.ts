import { createStore } from "zustand/vanilla";
import type { Category } from "~/types/product-category";
type State = {
  categories: Category[];
};
const store = createStore<State>(() => ({ categories: [] }));

export default store;
