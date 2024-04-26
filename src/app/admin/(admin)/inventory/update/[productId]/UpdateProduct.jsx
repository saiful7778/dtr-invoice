"use client";
import Button from "@/components/Button";
import ImageUploadComp from "@/components/ImageUpload";
import { Input } from "@/components/formik/Input";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import updateData from "@/lib/CURD/updateData";
import revalidate from "@/lib/actions/revalidation";
import Alert from "@/lib/config/alert.config";
import { addProductSchema } from "@/lib/schemas/Product";
import { Form, Formik } from "formik";
import { Spinner } from "keep-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UpdateProduct = ({ productData }) => {
  const {
    _id,
    image: { url, alt },
    productName,
    quantity,
    cost,
    sell,
  } = productData;

  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const [updateImage, setUpdateImage] = useState(false);
  // Image data
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
      if (updateImage) {
        if (!thumbnailImg.url) {
          Alert.fire({
            icon: "warning",
            text: "Please select an thumbnail image!",
          });
          setSpinner(false);
          return;
        }
        /**
         * delete previous image
         */
        await edgestore.dtrInoiceImages.delete({
          url,
        });
        /**
         * confirm update a new image
         */
        await edgestore.dtrInoiceImages.confirmUpload({
          url: thumbnailImg.url,
        });
        await updateProductData(_id, {
          image: thumbnailImg,
          productName: e.productName,
          quantity: e.quantity,
          cost: e.cost,
          sell: e.sell,
        });
      } else {
        await updateProductData(_id, {
          productName: e.productName,
          quantity: e.quantity,
          cost: e.cost,
          sell: e.sell,
        });
      }
    } catch (err) {
      console.error(err);
      Alert.fire({
        icon: "error",
        text: "Something went wrong",
      });
    } finally {
      setSpinner(false);
      reset();
      revalidate("/admin/inventory/all_products");
      router.push("/admin/inventory/all_products");
    }
  };

  return (
    <>
      {updateImage ? (
        <ImageUploadComp folder="product" setImageData={setThumbnailImg} />
      ) : (
        <figure className="my-2 flex flex-col items-center gap-2">
          <Image
            className="mx-auto"
            src={url}
            alt={alt}
            title={productName}
            width={400}
            height={300}
          />
          <Button
            onClick={() => setUpdateImage((l) => !l)}
            size="sm"
            variant="cancel"
          >
            Change
          </Button>
        </figure>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={addProductSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex flex-wrap gap-2">
            <Input
              name="productName"
              type="text"
              placeholder="Product name"
              label="Product name"
              disabled={spinner}
              required
            />
            <Input
              className="max-w-xs"
              name="quantity"
              type="number"
              placeholder="Product quantity"
              label="Product quantity"
              disabled={spinner}
              required
            />
            <Input
              className="max-w-xs"
              name="cost"
              type="number"
              placeholder="Product cost price"
              label="Product cost price"
              disabled={spinner}
              required
            />
            <Input
              className="max-w-xs"
              name="sell"
              type="number"
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
            {spinner ? <Spinner color="info" /> : "Update Product"}
          </Button>
        </Form>
      </Formik>
    </>
  );
};

async function updateProductData(id, productData) {
  const res = await updateData(`/product/${id}`, productData);
  if (!res.success) {
    throw new Error("Something went wrong");
  }
  Alert.fire({
    icon: "success",
    title: "Product is updated!",
  });
}

export default UpdateProduct;
