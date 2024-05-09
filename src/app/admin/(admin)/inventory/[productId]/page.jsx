import db from "@/lib/db";
import UpdateProduct from "./UpdateProduct";

async function getProduct(productId) {
  try {
    const data = await db.product.findUnique({
      where: { id: productId },
      include: { createdBy: true },
    });
    if (!data) {
      throw "No data available";
    }
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function generateMetadata({ params: { productId } }) {
  try {
    const productData = await getProduct(productId);
    const { productName } = productData;
    return {
      title: `${productName} - product`,
      description: `This is "${productName}" product page.`,
    };
  } catch {
    return {
      title: "Error product - admin",
      description: "There was an error to get this product data",
    };
  }
}

const SingleProduct = async ({ params: { productId } }) => {
  const productData = await getProduct(productId);
  return <UpdateProduct productData={productData} />;
};

export default SingleProduct;
