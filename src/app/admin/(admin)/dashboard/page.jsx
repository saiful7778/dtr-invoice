import StatsItem from "@/components/StatsItem";
import getProductStats from "@/lib/data/getProductStats";
import Link from "next/link";

const DashboardPage = async () => {
  const data = await getProductStats();
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        <StatsItem text="Total Product Cost" data={`${data?.totalCost}৳`} />
        <StatsItem text="Total Stock" data={data?.totalStock} />
      </div>
      <div className="w-full md:w-1/2">
        <div>Last product added:</div>
        <div className="flex items-center gap-4 rounded border border-gray-400 bg-gray-100 px-4 py-2 text-sm dark:border-gray-600 dark:bg-gray-700">
          <div>1.</div>
          <Link
            href={`/admin/inventory/${data?.id}`}
            className="flex-1 hover:text-blue-500 hover:underline"
          >
            {data?.productName}
          </Link>
          <div>Qunatity: {data?.quantity} item</div>
          <div>Cost: {data?.cost}৳</div>
          <div>Sell: {data?.sell}৳</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
