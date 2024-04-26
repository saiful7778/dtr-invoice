"use client";
import Button from "@/components/Button";
import ImageUploadComp from "@/components/ImageUpload";
import { Input } from "@/components/formik/Input";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import createData from "@/lib/CURD/createData";
import revalidate from "@/lib/actions/revalidation";
import Alert from "@/lib/config/alert.config";
import { addProductSchema } from "@/lib/schemas/Product";
import { Form, Formik } from "formik";
import { Spinner } from "keep-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddProduct = () => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const { edgestore } = useEdgeStore();
  const [thumbnailImg, setThumbnailImg] = useState({
    url: "",
    alt: "",
  });

  const initialValues = {
    productName: "",
    quantity: 0,
    cost: 0,
    sell: 0,
  };

  const handleReset = (resetForm) => {
    return () => {
      resetForm();
      setSpinner(false);
    };
  };

  const handleSubmit = async (e, { resetForm }) => {
    setSpinner(true);
    const reset = handleReset(resetForm);
    if (!e.quantity || !e.cost || !e.sell) {
      Alert.fire({
        icon: "error",
        title: "Please update data",
      });
      setSpinner(false);
      return;
    }
    try {
      await edgestore.dtrInoiceImages.confirmUpload({
        url: thumbnailImg.url,
      });
      const productData = {
        image: thumbnailImg,
        productName: e.productName,
        quantity: e.quantity,
        cost: e.cost,
        sell: e.sell,
      };
      const res = await createData("/product", productData);

      if (res.success) {
        Alert.fire({
          icon: "success",
          title: "Product is created!",
        });
      } else {
        Alert.fire({
          icon: "error",
          text: "Something went wrong",
        });
      }
    } catch (err) {
      console.error(err);
      Alert.fire({
        icon: "error",
        text: "Something went wrong",
      });
    } finally {
      reset();
      revalidate("/admin/inventory/all_products");
      router.push("/admin/inventory/all_products");
    }
  };

  return (
    <>
      <ImageUploadComp folder="product" setImageData={setThumbnailImg} />
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
            {spinner ? <Spinner color="info" /> : "Add Product"}
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default AddProduct;
