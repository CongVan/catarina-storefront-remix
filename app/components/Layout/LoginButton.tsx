import { SfButton } from "@storefront-ui/react";
import { IconLogin } from "@tabler/icons-react";
import { useTheme } from "~/context/theme";

export default function LoginButton() {
  const { showLogin } = useTheme();
  return (
    <>
      <SfButton
        className="-ml-0.5 mr-2 hidden text-primary-700 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200 active:text-primary-700 lg:inline-flex"
        aria-label={"Đăng nhập"}
        variant="tertiary"
        slotPrefix={<IconLogin />}
        onClick={() => showLogin()}
      >
        Đăng nhập
      </SfButton>
    </>
  );
}
