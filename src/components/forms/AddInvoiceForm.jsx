"use client";
import { useState } from "react";
import Alert from "@/lib/config/alert.config";
import createInvoice from "@/lib/actions/invoice/createInvoice";
import InvoiceDataForm from "@/components/invoice/InvoiceDataForm";
import revalidate from "@/lib/actions/revalidation";
import { useRouter } from "next/navigation";

const AddInvoiceForm = ({ invoiceId }) => {
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const [date, setDate] = useState(new Date());

  const initialValues = {
    invoiceId: invoiceId,
    name: "",
    address: "",
    products: [
      {
        productId: "",
        productName: "",
        quantity: 0,
        price: 0,
        totalPrice: 0,
      },
    ],
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
      const res = await createInvoice(
        { name: e.name, address: e.address },
        invoiceData,
      );
      if (!res.success) {
        Alert.fire({
          icon: "error",
          text: res.message,
        });
        return;
      }
      Alert.fire({
        icon: "success",
        title: "Invoice is created!",
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
      buttonText="Make invoice"
    />
  );
};

export default AddInvoiceForm;
