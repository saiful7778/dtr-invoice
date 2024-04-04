import React from "react";
import InvoiceForm from "./InvoiceForm";

export const metadata = {
  title: "Invoice - DTR-Invoice",
  description: "This is invoice making page.",
};

const InvoicePage = () => {
  return (
    <>
      <h1 className="text-center">DTR-Invoice</h1>
      <InvoiceForm />
    </>
  );
};

export default InvoicePage;
