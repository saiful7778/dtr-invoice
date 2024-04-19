import AddProduct from "./AddProduct";

export const metadata = {
  title: "Inventory - DTR-Invoice",
  description: "This is inventory management page.",
};

const InventoryPage = () => {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Add product</h1>
      <AddProduct />
    </>
  );
};

export default InventoryPage;
