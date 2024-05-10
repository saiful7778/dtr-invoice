import AddProductForm from "@/components/forms/AddProductForm";
import useAuth from "@/hooks/useAuth";

export const metadata = {
  title: "Add product - DTR-Invoice",
  description: "This is inventory product add page of DTR-Invoice.",
};

const ProductAddPage = async () => {
  const { user } = await useAuth();
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Add product</h1>
      <AddProductForm userId={user?.id} />
    </>
  );
};

export default ProductAddPage;
