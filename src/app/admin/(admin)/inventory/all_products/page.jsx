import Table from "@/components/table";
import readData from "@/lib/CURD/readData";
import Action from "./Action";
import moment from "moment";
import Link from "next/link";

export const metadata = {
  title: "All product - DTR-Invoice",
  description: "This is inventory all product management page.",
};

const AllProductPage = async () => {
  const productData = await readData("/products");
  const { data } = productData;
  return (
    <Table>
      <Table.caption className="p-2 font-semibold">
        Total Products: <span>{data.length}</span>
      </Table.caption>
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
        {data?.map((ele, idx) => (
          <TableRow
            key={"productTableRow" + idx}
            count={idx + 1}
            inputData={ele}
          />
        ))}
      </Table.body>
    </Table>
  );
};

const TableRow = ({ count, inputData }) => {
  const {
    _id,
    image: { url },
    productName,
    quantity,
    cost,
    createdAt,
    updatedAt,
    sell,
  } = inputData;

  const createdTime = moment(createdAt).format("Do MMM YY, h:mm a");
  const updatedTime = moment(updatedAt).format("Do MMM YY, h:mm a");
  return (
    <Table.row>
      <Table.cell className="text-center">{count}</Table.cell>
      <Table.cell>
        <Link
          href={`/admin/inventory/${_id}`}
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
        <Action productId={_id} imageUrl={url} />
      </Table.cell>
    </Table.row>
  );
};

export default AllProductPage;
