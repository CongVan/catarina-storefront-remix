import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
type AuthModal = "login" | "register" | null;
type State = {
  authModal: AuthModal;
};

type ContextState = {
  showLogin: () => void;
  showRegister: () => void;
  closeModal: () => void;
} & State;

enum ActionType {
  UPDATE_AUTH_MODAL = "UPDATE_AUTH_MODAL",
}
type Action = { type: ActionType.UPDATE_AUTH_MODAL; payload: AuthModal };

const initialState: State = {
  authModal: null,
};

const ThemeContext = createContext<ContextState | null>(null);

function themeReducer(state: State, action: Action): typeof initialState {
  const { type, payload } = action;
  switch (type) {
    case ActionType.UPDATE_AUTH_MODAL:
      return { ...state, authModal: payload };

    default:
      return state;
  }
}
export const ThemeProvider = (props: any) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const showLogin = useCallback(() => {
    dispatch({ type: ActionType.UPDATE_AUTH_MODAL, payload: "login" });
  }, []);

  const showRegister = useCallback(() => {
    dispatch({ type: ActionType.UPDATE_AUTH_MODAL, payload: "register" });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: ActionType.UPDATE_AUTH_MODAL, payload: null });
  }, []);

  const value = useMemo(() => {
    return {
      ...state,
      showLogin,
      showRegister,
      closeModal,
    };
  }, [state, showLogin, showRegister, closeModal]);

  return <ThemeContext.Provider value={value} {...props} />;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw Error("useContext must be used in ThemeProvider");
  }
  return context;
};
