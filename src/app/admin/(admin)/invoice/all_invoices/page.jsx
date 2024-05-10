import Button from "@/components/Button";
import DownloadData from "@/components/DownloadData";
import ReloadButton from "@/components/ReloadButton";
import Table from "@/components/table";
import db from "@/lib/db";
import moment from "moment";
import Link from "next/link";
import AllInvoiceAction from "@/components/actions/AllInvoiceAction";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All invoices - DTR-Invoice",
  description: "This is all invoices management page of DTR-Invoice",
};

async function getAllInvoices() {
  try {
    const data = await db.invoice.findMany({ include: { customer: true } });
    if (!data) {
      throw "No data available";
    }
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

const allInvoice = async () => {
  const allInvoice = await getAllInvoices();
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-sm">
          Total Invoice: <span>{allInvoice.length}</span>
        </div>
        <Button
          href="/admin/invoice/add_invoice"
          className="ml-auto"
          variant="primary-outline"
          size="sm"
        >
          Add Invoice
        </Button>
        <DownloadData inputData={{ allInvoice }} fileName="invoice" />
        <ReloadButton revalidatePath="/admin/invoice/all_invoices" />
      </div>
      <Table>
        <Table.head>
          <Table.headCell className="min-w-9 text-center">#NO</Table.headCell>
          <Table.headCell className="min-w-20">Invoice Id</Table.headCell>
          <Table.headCell className="min-w-48">Customer</Table.headCell>
          <Table.headCell className="min-w-56">Time</Table.headCell>
          <Table.headCell className="min-w-20">Price</Table.headCell>
          <Table.headCell className="min-w-48">Status</Table.headCell>
          <Table.headCell className="min-w-16">Actions</Table.headCell>
        </Table.head>
        <Table.body>
          {allInvoice?.map((ele, idx) => (
            <TableRow
              key={"invoiceTableRow" + idx}
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
  const {
    id,
    invoiceId,
    invoiceDate,
    totalPrice,
    customer: { name, address },
    createdAt,
    updatedAt,
  } = inputData;

  const createdTime = moment(createdAt).format("Do MMM YY, h:mm a");
  const updatedTime = moment(updatedAt).format("Do MMM YY, h:mm a");
  const invoiceCreateTime = moment(invoiceDate).format("Do MMM YY, h:mm a");

  return (
    <Table.row>
      <Table.cell className="text-center">{count}</Table.cell>
      <Table.cell>
        <Link
          href={`/admin/invoice/${id}`}
          className="hover:text-blue-500 hover:underline"
        >
          {invoiceId.toString().padStart(5, "0")}
        </Link>
      </Table.cell>
      <Table.cell>
        <div>
          <span className="text-xs">Name: </span>
          <span>{name}</span>
        </div>
        <div>
          <span className="text-xs">Address: </span>
          <span>{address}</span>
        </div>
      </Table.cell>
      <Table.cell>
        <span>Invoice: </span>
        <span>{invoiceCreateTime}</span>
      </Table.cell>
      <Table.cell>{totalPrice}৳</Table.cell>
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
        <AllInvoiceAction invoiceId={id} />
      </Table.cell>
    </Table.row>
  );
};

export default allInvoice;
