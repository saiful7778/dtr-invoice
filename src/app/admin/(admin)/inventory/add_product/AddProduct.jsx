"use client";
import Button from "@/components/Button";
import ImageUpload from "@/components/ImageUpload";
import { Input } from "@/components/formik/Input";
import { useEdgeStore } from "@/context/EdgeStoreContext";
import createProduct from "@/lib/actions/product/createProduct";
import revalidate from "@/lib/actions/revalidation";
import Alert from "@/lib/config/alert.config";
import { addProductSchema } from "@/lib/schemas/Product";
import { Form, Formik } from "formik";
import { Spinner } from "keep-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddProduct = ({ userId }) => {
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
    if (!thumbnailImg.url) {
      Alert.fire({
        icon: "error",
        title: "Please upload product image",
      });
      setSpinner(false);
      return;
    }
    try {
      await edgestore.dtrInoiceImages.confirmUpload({
        url: thumbnailImg.url,
      });
      const productData = {
        image: thumbnailImg.url,
        productName: e.productName,
        quantity: +e.quantity,
        cost: +e.cost,
        sell: +e.sell,
      };
      const res = await createProduct(productData, userId);
      if (res) {
        Alert.fire({
          icon: "success",
          title: "Product is created!",
        });
        await revalidate("/admin/inventory/all_products");
        router.push("/admin/inventory/all_products");
      }
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
    <div className="flex flex-col gap-4 md:flex-row">
      <ImageUpload folder="product" setImageData={setThumbnailImg} />
      <Formik
        initialValues={initialValues}
        validationSchema={addProductSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex-1">
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
            {spinner ? <Spinner color="info" size="xs" /> : "Add Product"}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddProduct;
