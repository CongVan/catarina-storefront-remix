import type { SfButtonProps } from "@storefront-ui/react";
import { SfLoaderLinear } from "@storefront-ui/react";
import { SfButton } from "@storefront-ui/react";
import { twMerge } from "tailwind-merge";

export const Button: React.FC<
  SfButtonProps & { loading?: boolean; loadingClass?: string }
> = ({ className, children, loading, disabled, loadingClass, ...rest }) => {
  return (
    <SfButton
      className={twMerge("relative overflow-hidden", className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <div className="absolute left-0 h-full w-full">
          <SfLoaderLinear
            ariaLabel="loading"
            className={twMerge(
              "h-full w-full bg-transparent text-primary-400 opacity-40",
              loadingClass
            )}
            size="lg"
          />
        </div>
      )}
      {children}
    </SfButton>
  );
};
