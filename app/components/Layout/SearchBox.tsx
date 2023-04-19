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
        className="w-full px-1.5 py-1.5"
        required
      />
      <input type="submit" hidden />
    </Form>
  );
};
