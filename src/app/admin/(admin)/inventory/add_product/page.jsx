import AddProduct from "./AddProduct";
import useAuth from "@/hooks/useAuth";

export const metadata = {
  title: "Add product - DTR-Invoice",
  description: "This is inventory product add page.",
};

const ProductAddPage = async () => {
  const { user } = await useAuth();
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Add product</h1>
      <AddProduct userId={user?.id} />
    </>
  );
};

export default ProductAddPage;
