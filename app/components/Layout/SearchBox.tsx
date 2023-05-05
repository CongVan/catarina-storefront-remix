import { Form, useSearchParams } from "@remix-run/react";
import { SfInput } from "@storefront-ui/react";
import { IconSearch } from "@tabler/icons-react";

export const SearchBox: React.FC = () => {
  const [params] = useSearchParams();
  return (
    <Form reloadDocument action="/search" method="get">
      <SfInput
        name="q"
        defaultValue={params.get("q")?.toString()}
        placeholder="Tìm kiếm sản phẩm"
        slotPrefix={<IconSearch className="h-6 w-6" />}
        size="lg"
        required
      />
      <input type="submit" hidden />
    </Form>
  );
};
