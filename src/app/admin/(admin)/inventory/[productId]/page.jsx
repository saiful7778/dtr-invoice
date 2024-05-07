import db from "@/lib/db";
import { Avatar } from "keep-react";
import Image from "next/image";
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
  const {
    image,
    productName,
    quantity,
    cost,
    sell,
    createdBy: { image: userImage, name, email },
  } = productData;
  return (
    <UpdateProduct productData={productData}>
      <div className="flex flex-col gap-2 md:flex-row">
        <Image src={image} alt={productName} width={300} height={150} />
        <div className="space-y-2">
          <div>
            <span>Product name:</span> <span>{productName}</span>
          </div>

          <div>
            <span>Quantity:</span> <span>{quantity}</span>
          </div>
          <div>
            <span>Cost:</span> <span>{cost}৳</span>
          </div>
          <div>
            <span>Sell:</span> <span>{sell}৳</span>
          </div>
          <div className="text-sm">Created by:</div>
          <div className="flex items-center gap-2">
            <Avatar
              className="border-2 border-gray-500 bg-transparent"
              shape="circle"
              size="lg"
              img={userImage}
            />
            <div>
              <div className="-mb-0.5 font-medium">{name}</div>
              <div className="text-sm">{email}</div>
            </div>
          </div>
        </div>
      </div>
    </UpdateProduct>
  );
};

export default SingleProduct;
