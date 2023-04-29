export const StatisticSkeleton: React.FC = () => {
  return (
    <div className="item-start group flex animate-pulse rounded border border-neutral-200 bg-white p-5 hover:border-secondary-600 hover:bg-secondary-50 hover:text-secondary-700">
      <div className="flex-1">
        <div className="h-2.5 w-1/2 rounded-full bg-neutral-100"></div>
        <div className="mt-2 h-3 w-1/6 rounded-full bg-neutral-100"></div>
      </div>
    </div>
  );
};
