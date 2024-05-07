"use client";
import ActionMenu from "@/components/ActionMenu";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import deleteData from "@/lib/CURD/deleteData";
import revalidate from "@/lib/actions/revalidation";
import Alert from "@/lib/config/alert.config";
import { useRouter } from "next/navigation";

const Action = ({ productId, imageUrl }) => {
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const handleUpdate = () => {
    router.push(`/admin/inventory/${productId}`);
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
        const { data } = await deleteData(`/product/${productId}`);
        if (data.deletedCount !== 1) {
          throw new Error("Something went wrong");
        }
        await edgestore.dtrInoiceImages.delete({
          url: imageUrl,
        });
        Alert.fire({
          icon: "success",
          title: "Product is deleted!",
        });
      } catch (err) {
        console.error(err);
        Alert.fire({
          icon: "error",
          text: "Something went wrong",
        });
      } finally {
        revalidate("/admin/inventory/all_products");
      }
    }
  };
  return <ActionMenu handleUpdate={handleUpdate} handleDelete={handleDelete} />;
};

export default Action;
