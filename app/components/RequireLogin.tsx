import toast from "react-hot-toast";
import { useTheme } from "~/context/theme";
import { useAuth } from "~/hooks/user-auth";

type Props = {
  children: ({ handle }) => JSX.Element;
};
export const RequireAuth: React.FC<Props> = ({ children }) => {
  const { customer } = useAuth();
  const { showLogin } = useTheme();

  const handle = (callback) => {
    if (customer) {
      callback();
    } else {
      toast("Vui lòng đăng nhập để sử dụng tính năng này");
      return showLogin();
    }
  };
  return <>{children({ handle })}</>;
};
