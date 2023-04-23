import { createContext, useContext } from "react";
import type { Category } from "~/types/product-category";

type State = {
  categories: Category[];
  env: any;
};

const AppContext = createContext<State>({ categories: [], env: {} });

export const AppProvider = ({ children, categories, env }) => {
  return (
    <AppContext.Provider value={{ categories, env }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be use in AppProvider");
  }
  return context;
};
