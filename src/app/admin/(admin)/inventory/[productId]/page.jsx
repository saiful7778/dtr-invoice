import db from "@/lib/db";
import UpdateProductForm from "@/components/forms/UpdateProductForm";
import { Avatar } from "keep-react";

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
  return (
    <UpdateProductForm productData={productData}>
      <div className="text-xs">Created by: </div>
      <div className="mt-1 flex items-center gap-2 text-sm">
        <Avatar size="lg" img={productData.createdBy?.image} />
        <div>
          <div className="text-lg font-bold leading-none">
            {productData.createdBy?.name}
          </div>
          <div className="leading-none text-gray-600 dark:text-gray-400">
            {productData.createdBy?.email}
          </div>
        </div>
      </div>
    </UpdateProductForm>
  );
};

export default SingleProduct;
