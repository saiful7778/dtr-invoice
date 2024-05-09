import db from "@/lib/db";
import invoiceIdNum from "@/lib/utils/invoiceId";
import UpdateInvoice from "./UpdateInvoice";

async function getInvoice(invoiceId) {
  try {
    const data = await db.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        customer: true,
        products: {
          include: {
            product: { select: { productName: true, sell: true, id: true } },
          },
        },
      },
    });
    if (!data) {
      throw "No data available";
    }
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function generateMetadata({ params: { invoiceId } }) {
  try {
    const invoiceData = await getInvoice(invoiceId);
    const { invoiceId: id } = invoiceData;
    return {
      title: `${invoiceIdNum(id)} - invoice`,
      description: `This is "${invoiceIdNum(id)}" invoice page.`,
    };
  } catch {
    return {
      title: "Error product - admin",
      description: "There was an error to get this product data",
    };
  }
}

const Invoice = async ({ params: { invoiceId } }) => {
  const data = await getInvoice(invoiceId);
  return (
    <div>
      <UpdateInvoice inputData={data} />
    </div>
  );
};

export default Invoice;
