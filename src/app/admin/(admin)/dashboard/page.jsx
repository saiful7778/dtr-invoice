import StatsItem from "@/components/StatsItem";
import getInvoiceStats from "@/lib/data/getInvoiceStats";
import getProductStats from "@/lib/data/getProductStats";
import invoiceId from "@/lib/utils/invoiceId";
import Link from "next/link";

const DashboardPage = async () => {
  const productData = await getProductStats();
  const invoiceData = await getInvoiceStats();

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        <StatsItem
          text="Total Product Cost"
          data={`${productData?.totalCost}৳`}
        />
        <StatsItem text="Total Stock" data={productData?.totalStock} />
        <StatsItem text="Sells" data={`${invoiceData?.totalSells}৳`} />
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <Item title="product added">
          <div>1.</div>
          <Link
            href={`/admin/inventory/${productData?.id}`}
            className="flex-1 hover:text-blue-500 hover:underline"
          >
            {productData?.productName}
          </Link>
          <div>Qunatity: {productData?.quantity} item</div>
          <div>Cost: {productData?.cost}৳</div>
          <div>Sell: {productData?.sell}৳</div>
        </Item>
        <Item title="Invoice added">
          <div>1.</div>
          <Link
            href={`/admin/invoice/${invoiceId(invoiceData?.id)}`}
            className="flex-1 hover:text-blue-500 hover:underline"
          >
            {invoiceId(invoiceData?.invoiceId)}
          </Link>
          <div>Total sell: {invoiceData?.totalPrice}৳</div>
        </Item>
      </div>
    </div>
  );
};

const Item = ({ title, children }) => {
  return (
    <div className="w-full">
      <div>Last {title}:</div>
      <div className="flex items-center gap-4 rounded border border-gray-400 bg-gray-100 px-4 py-2 text-sm dark:border-gray-600 dark:bg-gray-700">
        {children}
      </div>
    </div>
  );
};

export default DashboardPage;
