import AddProduct from "./AddProduct";

export const metadata = {
  title: "Inventory - DTR-Invoice",
  description: "This is inventory management page.",
};

const InventoryPage = () => {
  return (
    <>
      <AddProduct />
    </>
  );
};

export default InventoryPage;
