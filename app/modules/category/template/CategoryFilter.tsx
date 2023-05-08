import { CategoryAttributeFilter } from "~/modules/category/components/CategoryAttributeFilter";
import type { ProductAttribute } from "~/types/product-attribute";

export const CategoryFilter: React.FC<{ attributes: ProductAttribute[] }> = ({
  attributes,
}) => {
  return (
    <div className=" border-b border-t border-neutral-200">
      <div className="container flex w-full items-start ">
        {attributes.map((attr) => (
          <CategoryAttributeFilter key={attr.id} attribute={attr} />
        ))}
      </div>
    </div>
  );
};
