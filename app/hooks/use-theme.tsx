import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
type AuthModal = "login" | "register" | null;
type State = {
  authModal: AuthModal;
  isShowCartModal: boolean;
};

type ContextState = {
  showLogin: () => void;
  showRegister: () => void;
  toggleCartModal: (isOpen: boolean) => void;
  closeModal: () => void;
} & State;

enum ActionType {
  UPDATE_AUTH_MODAL,
  TOGGLE_CART_MODAL,
}
type Action =
  | { type: ActionType.UPDATE_AUTH_MODAL; payload: AuthModal }
  | {
      type: ActionType.TOGGLE_CART_MODAL;
      payload: boolean;
    };

const initialState: State = {
  authModal: null,
  isShowCartModal: false,
};

const ThemeContext = createContext<ContextState | null>(null);

function themeReducer(state: State, action: Action): typeof initialState {
  const { type, payload } = action;
  switch (type) {
    case ActionType.UPDATE_AUTH_MODAL: {
      return { ...state, authModal: payload };
    }
    case ActionType.TOGGLE_CART_MODAL: {
      return { ...state, isShowCartModal: payload };
    }

    default:
      return state;
  }
}
export const ThemeProvider = (props: any) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const showLogin = useCallback(() => {
    startTransition(() => {
      dispatch({ type: ActionType.UPDATE_AUTH_MODAL, payload: "login" });
    });
  }, []);

  const showRegister = useCallback(() => {
    startTransition(() => {
      dispatch({ type: ActionType.UPDATE_AUTH_MODAL, payload: "register" });
    });
  }, []);

  const closeModal = useCallback(() => {
    startTransition(() => {
      dispatch({ type: ActionType.UPDATE_AUTH_MODAL, payload: null });
    });
  }, []);

  const toggleCartModal = useCallback((isOpen: boolean) => {
    startTransition(() => {
      dispatch({ type: ActionType.TOGGLE_CART_MODAL, payload: isOpen });
    });
  }, []);

  const value = useMemo(() => {
    return {
      ...state,
      showLogin,
      showRegister,
      closeModal,
      toggleCartModal,
    };
  }, [state, showLogin, showRegister, closeModal, toggleCartModal]);

  return <ThemeContext.Provider value={value} {...props} />;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw Error("useContext must be used in ThemeProvider");
  }
  return context;
};
