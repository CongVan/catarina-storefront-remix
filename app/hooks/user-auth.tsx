import { createContext, useContext } from "react";
import type { Maybe } from "~/types/common";
import type { Customer } from "~/types/user";

type State = {
  customer: Maybe<Customer>;
};

const AuthContext = createContext<State>({ customer: null });

export const AuthProvider = ({ children, customer }) => {
  return (
    <AuthContext.Provider value={{ customer }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be use in AuthProvider");
  }
  return context;
};
