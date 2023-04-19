import { useLoaderData } from "@remix-run/react";
import type { loader } from "~/routes/$";

export const ProductInfo: React.FC = () => {
  const { product } = useLoaderData<typeof loader>();
  return (
    <div className="mx-auto mt-14 max-w-[60rem]">
      <h3 className=" mb-5 text-center font-semibold uppercase  sf-headline-3">
        Mô tả sản phẩm
      </h3>
      <div
        className="whitespace-pre-wrap leading-6 tracking-wide"
        dangerouslySetInnerHTML={{ __html: product.description }}
      ></div>
    </div>
  );
};
