import { useCart } from "~/hooks/use-cart";
import { ProductCartItemCard } from "~/modules/product/components/ProductCartItemCard";

export const ProductCartList: React.FC = () => {
  const { lines } = useCart();
  return (
    <div className="space-y-2 ">
      {lines.map((line) => (
        <ProductCartItemCard
          key={line.productId + "-" + line.variantId}
          line={line}
        />
      ))}
    </div>
  );
};
