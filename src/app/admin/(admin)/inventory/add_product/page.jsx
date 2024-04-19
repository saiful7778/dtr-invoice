import AddProduct from "./AddProduct";

export const metadata = {
  title: "Add product - DTR-Invoice",
  description: "This is inventory product add page.",
};

const ProductAddPage = () => {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Add product</h1>
      <AddProduct />
    </>
  );
};

export default ProductAddPage;
