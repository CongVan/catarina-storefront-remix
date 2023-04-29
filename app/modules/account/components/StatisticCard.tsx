import { Link } from "@remix-run/react";

export const StatisticCard: React.FC<{
  name: string;
  href: string;
  amount: number;
}> = ({ name, href, amount }) => {
  return (
    <div className="item-start group flex rounded border border-neutral-200 bg-white p-5 hover:border-secondary-600 hover:bg-secondary-50 hover:text-secondary-700">
      <div className="flex-1">
        <div className="text-sm text-neutral-700 group-hover:text-secondary-700">
          {name}
        </div>
        <div className="font-semibold sf-headline-5">{amount}</div>
      </div>
      <div className="flex flex-col items-end justify-end text-sm text-neutral-600 group-hover:text-secondary-500">
        <Link to={href}>Chi tiết</Link>
      </div>
    </div>
  );
};
