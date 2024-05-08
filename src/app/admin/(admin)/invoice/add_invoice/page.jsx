import React from "react";
import InvoiceForm from "./InvoiceForm";
import db from "@/lib/db";

export const metadata = {
  title: "Invoice - DTR-Invoice",
  description: "This is invoice making page.",
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
  const { invoiceId } = await getInvoiceNumber();
  return (
    <>
      <h1 className="text-center">DTR-Invoice</h1>
      <InvoiceForm
        invoiceId={
          invoiceId ? (invoiceId + 1).toString().padStart(5, "0") : "00001"
        }
      />
    </>
  );
};

export default InvoicePage;
