"use client";
import InvoiceDataForm from "@/components/invoice/InvoiceDataForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import getinvoiceId from "@/lib/utils/invoiceId";
import revalidate from "@/lib/actions/revalidation";
import Alert from "@/lib/config/alert.config";
import updateInvoice from "@/lib/actions/invoice/updateInvoice";

const UpdateInvoice = ({ inputData }) => {
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const {
    id,
    invoiceId,
    customer: { name, address },
    products,
    invoiceDate,
  } = inputData;
  const [date, setDate] = useState(new Date(invoiceDate));

  const initialValues = {
    invoiceId: getinvoiceId(invoiceId),
    name: name,
    address: address,
    products: products.map((ele) => ({
      productId: ele.productId,
      productName: ele.product.productName,
      quantity: ele.quantity,
      price: ele.product.sell,
      totalPrice: ele.totalPrice,
    })),
  };

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
    };
  };

  const handleSubmit = async (e, { resetForm }) => {
    setSpinner(true);
    const reset = handleReset(resetForm);
    try {
      const invoiceData = {
        invoiceId: +e.invoiceId,
        invoiceDate: date.toISOString(),
        products: {
          create: e.products.map((ele) => ({
            productId: ele.productId,
            quantity: +ele.quantity,
            totalPrice: +ele.quantity * ele.price,
          })),
        },
        totalPrice: e.products.reduce(
          (sum, curr) => sum + parseInt(curr.quantity) * curr.price,
          0,
        ),
      };
      await updateInvoice(id, invoiceData);
      Alert.fire({
        icon: "success",
        title: "Invoice is Updated!",
      });
      await revalidate("/admin/invoice/all_invoices");
      router.push("/admin/invoice/all_invoices");
    } catch {
      Alert.fire({
        icon: "error",
        text: "Something went wrong",
      });
    } finally {
      reset();
    }
  };

  return (
    <InvoiceDataForm
      initialValues={initialValues}
      setDate={setDate}
      date={date}
      handleSubmit={handleSubmit}
      spinner={spinner}
      buttonText="Update invoice"
    />
  );
};

export default UpdateInvoice;
