import { useLoaderData } from "@remix-run/react";
import { SfListItem, SfRadio } from "@storefront-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { loader } from "~/routes/checkout";
import { formatCurrency } from "~/utils/currency";

export default function DeliveryMethods() {
  const { shippingMethods } = useLoaderData<typeof loader>();
  console.log(shippingMethods);
  const {
    formState: { errors },
  } = useFormContext();

  const { replace } = useFieldArray({ name: "shipping_lines" });

  return (
    <fieldset className="mb-6">
      <legend className="mb-4 flex w-full items-center font-bold text-neutral-900 sf-headline-5">
        <span>Hình thức giao hàng</span>
        {errors["shipping_lines"] && (
          <span className="ml-auto font-semibold text-negative-600">
            Chọn hình thức giao hàng
          </span>
        )}
      </legend>
      <div className="grid grid-cols-1 items-stretch gap-4">
        {shippingMethods.map(
          ({ title, id, description, method_title, method_id, settings }) => (
            <SfListItem
              as="label"
              key={id}
              slotPrefix={
                <div className="flex flex-col items-center">
                  <SfRadio
                    className="my-auto"
                    name="delivery-options"
                    value={id}
                    onChange={(e) => {
                      if (e.target.checked) {
                        console.log("set shipping");

                        replace([
                          {
                            method_id: id,
                            method_title: title,
                            ...(settings?.cost?.value && {
                              total: settings?.cost?.value,
                            }),
                          },
                        ]);
                        // setValue("shipping_lines.0.title", method_title);
                        // setValue(
                        //   "shipping_lines.0.cost",
                        //   settings?.cost || "0"
                        // );
                      }
                    }}
                  />
                </div>
              }
              slotSuffix={
                <span className="text-lg font-semibold text-black">
                  {formatCurrency(settings?.cost?.value || 0)}
                </span>
              }
              className="w-full !items-center rounded-md border border-neutral-200"
            >
              {title}
            </SfListItem>
          )
        )}
      </div>
    </fieldset>
  );
}
