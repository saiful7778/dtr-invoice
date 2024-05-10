import React from "react";
import db from "@/lib/db";
import getInvoiceId from "@/lib/utils/invoiceId";
import AddInvoiceForm from "@/components/forms/AddInvoiceForm";

export const metadata = {
  title: "Add Invoice - DTR-Invoice",
  description: "This is invoice making page of DTR-Invoice.",
};

async function getInvoiceNumber() {
  try {
    const data = await db.invoice.findFirst({
      orderBy: { createdAt: "desc" },
      take: 1,
      select: {
        invoiceId: true,
      },
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

const InvoicePage = async () => {
  const invoiceId = await getInvoiceNumber();
  return (
    <>
      <h1 className="text-center">DTR-Invoice</h1>
      <AddInvoiceForm
        invoiceId={invoiceId ? getInvoiceId(invoiceId?.invoiceId + 1) : "00001"}
      />
    </>
  );
};

export default InvoicePage;
