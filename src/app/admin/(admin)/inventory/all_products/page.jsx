import Table from "@/components/table";
import Action from "./Action";
import moment from "moment";
import Link from "next/link";
import Button from "@/components/Button";
import ReloadButton from "@/components/ReloadButton";
import db from "@/lib/db";
import DownloadData from "@/components/DownloadData";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All products - DTR-Invoice",
  description: "This is inventory all product management page of DTR-Invoice.",
};

async function getAllProducts() {
  try {
    const data = await db.product.findMany({ include: { createdBy: true } });
    if (!data) {
      throw "No data available";
    }
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

const AllProductPage = async () => {
  const allProductData = await getAllProducts();
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-sm">
          Total Products: <span>{allProductData.length}</span>
        </div>
        <Button
          href="/admin/inventory/add_product"
          className="ml-auto"
          variant="primary-outline"
          size="sm"
        >
          Add Product
        </Button>
        <DownloadData inputData={{ allProductData }} fileName="products" />
        <ReloadButton revalidatePath="/admin/inventory/all_products" />
      </div>
      <Table>
        <Table.head>
          <Table.headCell className="min-w-9 text-center">#NO</Table.headCell>
          <Table.headCell className="min-w-48">Product name</Table.headCell>
          <Table.headCell className="min-w-20">Quantity</Table.headCell>
          <Table.headCell className="min-w-20">Cost</Table.headCell>
          <Table.headCell className="min-w-20">Sell</Table.headCell>
          <Table.headCell className="min-w-48">Status</Table.headCell>
          <Table.headCell className="min-w-16">Actions</Table.headCell>
        </Table.head>
        <Table.body>
          {allProductData?.map((ele, idx) => (
            <TableRow
              key={"productTableRow" + idx}
              count={idx + 1}
              inputData={ele}
            />
          ))}
        </Table.body>
      </Table>
    </>
  );
};

const TableRow = ({ count, inputData }) => {
  const { id, image, productName, quantity, cost, createdAt, updatedAt, sell } =
    inputData;

  const createdTime = moment(createdAt).format("Do MMM YY, h:mm a");
  const updatedTime = moment(updatedAt).format("Do MMM YY, h:mm a");
  return (
    <Table.row>
      <Table.cell className="text-center">{count}</Table.cell>
      <Table.cell>
        <Link
          href={`/admin/inventory/${id}`}
          className="hover:text-blue-500 hover:underline"
        >
          {productName}
        </Link>
      </Table.cell>
      <Table.cell>{quantity}</Table.cell>
      <Table.cell>{cost}৳</Table.cell>
      <Table.cell>{sell}৳</Table.cell>
      <Table.cell>
        <div className="text-xs">
          <div>
            <span>Create: </span>
            <span>{createdTime}</span>
          </div>
          <div>
            <span>Update: </span>
            <span>{updatedTime}</span>
          </div>
        </div>
      </Table.cell>
      <Table.cell>
        <Action productId={id} imageUrl={image} />
      </Table.cell>
    </Table.row>
  );
};

export default AllProductPage;
