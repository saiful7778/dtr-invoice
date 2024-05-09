"use client";
import ActionMenu from "@/components/ActionMenu";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import deleteProduct from "@/lib/actions/product/deleteProduct";
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
        const data = await deleteProduct(productId);
        if (!data) {
          throw "Error";
        }
        if (imageUrl) {
          await edgestore.dtrInoiceImages.delete({
            url: imageUrl,
          });
        }
        Alert.fire({
          icon: "success",
          title: "Product is deleted!",
        });
      } catch {
        Alert.fire({
          icon: "error",
          text: "Something went wrong",
        });
      } finally {
        await revalidate("/admin/inventory/all_products");
      }
    }
  };
  return <ActionMenu handleUpdate={handleUpdate} handleDelete={handleDelete} />;
};

export default Action;
