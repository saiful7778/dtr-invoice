/* eslint-disable no-unsafe-optional-chaining */
import readData from "@/lib/CURD/readData";
import Image from "next/image";

export async function generateMetadata({ params: { productId } }) {
  try {
    const productData = await readData(`/product/${productId}`);
    const { productName } = productData?.data;
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
  const productData = await readData(`/product/${productId}`);
  const {
    image: { url, alt },
    productName,
    quantity,
    cost,
    sell,
  } = productData?.data;
  return (
    <div className="flex gap-2">
      <Image src={url} alt={alt} width={400} height={200} />
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
      </div>
    </div>
  );
};

export default SingleProduct;
