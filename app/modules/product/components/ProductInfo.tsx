import { useLoaderData } from "@remix-run/react";
import type { loader } from "~/routes/$";

export const ProductInfo: React.FC = () => {
  const { product } = useLoaderData<typeof loader>();
  return (
    <div className="mx-auto mt-10 max-w-[60rem]">
      <h3 className=" mb-5 text-center font-semibold uppercase  sf-headline-2">
        Mô tả sản phẩm
      </h3>
      <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
    </div>
  );
};
