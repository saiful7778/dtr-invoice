"use client";
import ActionMenu from "@/components/ActionMenu";
import deleteInvoice from "@/lib/actions/invoice/deleteInvoice";
import revalidate from "@/lib/actions/revalidation";
import Alert from "@/lib/config/alert.config";
import { useRouter } from "next/navigation";

const AllInvoiceAction = ({ invoiceId }) => {
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
        if (!res.success) {
          Alert.fire({
            icon: "error",
            text: res.message,
          });
          return;
        }
        Alert.fire({
          icon: "success",
          title: "Invoice is deleted!",
        });
      } catch {
        Alert.fire({
          icon: "error",
          text: "Something went wrong",
        });
      } finally {
        await revalidate("/admin/invoice/all_invoices");
      }
    }
  };
  return <ActionMenu handleUpdate={handleUpdate} handleDelete={handleDelete} />;
};

export default AllInvoiceAction;
