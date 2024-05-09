"use client";
import ActionMenu from "@/components/ActionMenu";
import deleteInvoice from "@/lib/actions/invoice/deleteInvoice";
import revalidate from "@/lib/actions/revalidation";
import Alert from "@/lib/config/alert.config";
import { useRouter } from "next/navigation";
import React from "react";

const Action = ({ invoiceId }) => {
  const router = useRouter();

  const handleUpdate = () => {
    router.push(`/admin/invoice/${invoiceId}`);
  };

  const handleDelete = async () => {
    const { isConfirmed } = await Alert.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (isConfirmed) {
      Alert.fire({
        didOpen: () => {
          Alert.showLoading();
        },
      });
      try {
        const res = await deleteInvoice(invoiceId);
        if (!res) {
          throw "Error";
        }
        Alert.fire({
          icon: "success",
          title: "Invoice is deleted!",
        });
      } catch (err) {
        console.error(err);
        Alert.fire({
          icon: "error",
          text: "Something went wrong",
        });
      } finally {
        revalidate("/admin/invoice/all_invoices");
      }
    }
  };
  return <ActionMenu handleUpdate={handleUpdate} handleDelete={handleDelete} />;
};

export default Action;
