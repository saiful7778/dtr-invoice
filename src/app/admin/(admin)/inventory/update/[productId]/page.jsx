/* eslint-disable no-unsafe-optional-chaining */
import readData from "@/lib/CURD/readData";
import UpdateProduct from "./UpdateProduct";

export async function generateMetadata({ params: { productId } }) {
  try {
    const productData = await readData(`/product/${productId}`);
    const { productName } = productData?.data;
    return {
      title: `${productName} - product update`,
      description: `This is "${productName}" product update`,
    };
  } catch {
    return {
      title: "Error product - admin",
      description: "There was an error to get this product data",
    };
  }
}

const ProductUpdate = async ({ params: { productId } }) => {
  const productData = await readData(`/product/${productId}`);
  return (
    <>
      <UpdateProduct productData={productData?.data} />
    </>
  );
};

export default ProductUpdate;
