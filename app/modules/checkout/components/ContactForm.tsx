import { SfInput, SfButton, SfSelect } from "@storefront-ui/react";
import type { ChangeEvent, FormEventHandler } from "react";
import { useState } from "react";

export default function ContactForm() {
  const [invalid, setInvalid] = useState(true);
  const options = [
    1, 7, 20, 27, 30, 30, 31, 32, 33, 34, 36, 39, 40, 41, 43, 44, 45, 46, 47,
    48, 49, 51,
  ];
  const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleValidation = (event: ChangeEvent<HTMLInputElement>) =>
    emailRegExp.test(event?.target.value)
      ? setInvalid(false)
      : setInvalid(true);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    /* your submit handler e.g.: */
    const form = e.target as HTMLFormElement;

    // data can be accessed in form of FormData
    const formData = new FormData(form);
    // or JSON object
    const formJSON = Object.fromEntries(formData.entries());
    // eslint-disable-next-line no-console
    console.log(formJSON);
  };

  return (
    <form
      className="flex flex-col gap-y-4 text-neutral-900"
      onSubmit={onSubmit}
    >
      <h3 className="font-bold sf-headline-4 md:sf-headline-3">
        Thông tin đặt hàng
      </h3>
      <div className="gap-y-0.5">
        <label className="gap-y-0.5">
          <span className="text-sm font-medium">Email</span>
          <SfInput
            name="email"
            onChange={handleValidation}
            placeholder="email address"
            invalid={invalid}
            autoComplete="email"
          />
        </label>
        {invalid && (
          <div>
            <p className="mt-0.5  font-medium text-negative-700 sf-error-sm">
              Please provide a valid email
            </p>
          </div>
        )}
      </div>
      <label className="flex flex-col gap-y-0.5">
        <span className="font-medium sf-text-sm">Phone number</span>
        <div className="flex">
          <SfSelect
            name="phone-country-code"
            className="mr-4 w-16"
            placeholder="--"
            autoComplete="tel-country-code"
          >
            {options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </SfSelect>
          <SfInput
            name="phone-national"
            wrapperClassName="w-full"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
          />
        </div>
      </label>
      <div className="flex justify-between gap-4 md:justify-end">
        <SfButton className="w-full md:w-auto" type="reset" variant="secondary">
          Clear all
        </SfButton>
        <SfButton className="w-full md:w-auto" type="submit">
          Save
        </SfButton>
      </div>
    </form>
  );
}
