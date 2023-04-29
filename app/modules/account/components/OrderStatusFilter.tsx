import { useLocation, useNavigate, useSearchParams } from "@remix-run/react";
import { SfChip } from "@storefront-ui/react";
import qs from "qs";
import { ORDER_STATUS } from "~/types/order";
import { getOrderStatus, stringifyQuery } from "~/utils/helper";

const list = [{ label: "Tất cả", value: ["any"] }].concat(
  ORDER_STATUS.filter((s) => !["failed", "trash"].includes(s)).map(
    (status) => ({
      label: getOrderStatus(status),
      value: [status],
    })
  )
);

export const OrderStatusFilter: React.FC<{
  onChange: (queryFilter) => void;
}> = ({ onChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const query = qs.parse(searchParams.toString());

  const status = (query.status as string[]) || ["any"];

  const handleOnChangeStatus = (sta) => {
    let newStatus = status.filter((s) => s !== "any");
    if (sta.includes("any")) {
      newStatus = [];
    } else {
      for (let i = 0; i < sta.length; i++) {
        const s = sta[i];
        if (status.includes(s)) {
          delete newStatus[i];
        } else {
          newStatus.push(s);
        }
      }
    }

    console.log(newStatus);
    const newQuery = { ...query, status: newStatus };
    navigate(location.pathname + "?" + stringifyQuery(newQuery), {
      replace: true,
    });
    onChange({ ...query, status: newStatus, page: 1 });
  };

  return (
    <ul className="mb-4 flex flex-wrap gap-2">
      {list.map(({ label, value }) => (
        <li key={label}>
          <SfChip
            inputProps={{
              checked: value.every((s) => status.includes(s)),
              onChange: () => handleOnChangeStatus(value),
            }}
          >
            {label}
          </SfChip>
        </li>
      ))}
    </ul>
  );
};
