"use client";

import Button from "@/components/Button";
import ImageUpload from "@/components/ImageUpload";
import { Input } from "@/components/formik/Input";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import updateProduct from "@/lib/actions/product/updateProduct";
import revalidate from "@/lib/actions/revalidation";
import Alert from "@/lib/config/alert.config";
import { addProductSchema } from "@/lib/schemas/Product";
import { Form, Formik } from "formik";
import { Spinner } from "keep-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UpdateProduct = ({ productData }) => {
  const { id, image, productName, quantity, cost, sell } = productData;
  const [spinner, setSpinner] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const [thumbnailImg, setThumbnailImg] = useState({
    url: "",
    alt: "",
  });

  const initialValues = {
    productName: productName,
    quantity: quantity,
    cost: cost,
    sell: sell,
  };

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
      setThumbnailImg({
        url: "",
        alt: "",
      });
    };
  };

  const handleSubmit = async (e, { resetForm }) => {
    setSpinner(true);
    const reset = handleReset(resetForm);
    try {
      if (thumbnailImg.url) {
        if (image) {
          /**
           * delete previous image
           */
          await edgestore.dtrInoiceImages.delete({
            url: image,
          });
        }
        /**
         * confirm update a new image
         */
        await edgestore.dtrInoiceImages.confirmUpload({
          url: thumbnailImg.url,
        });
        await updateProductData(id, {
          image: thumbnailImg.url,
          productName: e.productName,
          quantity: +e.quantity,
          cost: +e.cost,
          sell: +e.sell,
        });
      } else {
        await updateProductData(id, {
          productName: e.productName,
          quantity: +e.quantity,
          cost: +e.cost,
          sell: +e.sell,
        });
      }
      await revalidate("/admin/inventory/all_products");
      router.push("/admin/inventory/all_products");
    } catch {
      Alert.fire({
        icon: "error",
        text: "Something went wrong",
      });
    } finally {
      reset();
    }
  };
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="w-full md:w-2/5">
        {!updateImage && image ? (
          <figure>
            <Image
              className="mx-auto"
              src={image}
              alt={productName}
              title={productName}
              width={300}
              height={150}
            />
          </figure>
        ) : (
          <ImageUpload folder="product" setImageData={setThumbnailImg} />
        )}
        {image && (
          <div className="my-4 flex justify-center">
            <Button
              className="mx-auto block"
              onClick={() => setUpdateImage((l) => !l)}
              size="sm"
              variant="cancel"
            >
              {updateImage ? "Cancel" : "Change"}
            </Button>
          </div>
        )}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={addProductSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full md:w-3/5">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Input
              name="productName"
              type="text"
              placeholder="Product name"
              label="Product name"
              disabled={spinner}
              required
            />
            <Input
              name="quantity"
              type="text"
              placeholder="Product quantity"
              label="Product quantity"
              disabled={spinner}
              required
            />
            <Input
              name="cost"
              type="text"
              placeholder="Product cost price"
              label="Product cost price"
              disabled={spinner}
              required
            />
            <Input
              name="sell"
              type="text"
              placeholder="Product sell price"
              label="Product sell price"
              disabled={spinner}
              required
            />
          </div>
          <Button
            className="mt-2"
            variant="confirm"
            disabled={spinner}
            type="submit"
          >
            {spinner ? (
              <Spinner color="info" size="xs" />
            ) : (
              "Update Product data"
            )}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

async function updateProductData(id, productData) {
  await updateProduct(id, productData);
  Alert.fire({
    icon: "success",
    title: "Product is updated!",
  });
}

export default UpdateProduct;
