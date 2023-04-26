import type { SfInputProps } from "@storefront-ui/react";
import { SfInput } from "@storefront-ui/react";
type Props = SfInputProps & {
  groupClass?: string;
  label?: string;
  error?: any;
  register?: any;
};

export const Input: React.FC<Props> = ({
  groupClass,
  label,
  error,
  register,
  name,
  ...inputProps
}) => {
  return (
    <div className={groupClass}>
      {label ? (
        <label className="w-full">
          <div className="mb-1 text-sm font-medium">
            {label}{" "}
            {inputProps.required ? (
              <span className="mb-2 text-negative-600">*</span>
            ) : (
              ""
            )}
          </div>
          <SfInput
            invalid={!!error}
            {...inputProps}
            {...(register && name && { ...register(name) })}
          />
        </label>
      ) : (
        <SfInput
          {...inputProps}
          {...(register && name && { ...register(name) })}
        />
      )}

      {error && (
        <div className="flex justify-between">
          <div>
            <p className="mt-0.5 text-sm font-medium text-negative-700">
              {error}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
