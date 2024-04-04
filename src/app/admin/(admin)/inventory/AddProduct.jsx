"use client";
import { Input } from "@/components/formik/Input";
import createData from "@/lib/CURD/createData";
import Alert from "@/lib/config/alert.config";
import { addProductSchema } from "@/lib/schemas/Product";
import { Form, Formik } from "formik";
import { Button, Spinner } from "keep-react";
import { useState } from "react";

const AddProduct = () => {
  const [spinner, setSpinner] = useState(false);

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
    try {
      const productData = {
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
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addProductSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-2">
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
          type="number"
          placeholder="Product quantity"
          label="Product quantity"
          disabled={spinner}
          required
        />
        <Input
          name="cost"
          type="number"
          placeholder="Product cost price"
          label="Product cost price"
          disabled={spinner}
          required
        />
        <Input
          name="sell"
          type="number"
          placeholder="Product sell price"
          label="Product sell price"
          disabled={spinner}
          required
        />
        <Button
          className="w-full rounded-full"
          color="primary"
          size="sm"
          disabled={spinner}
          type="submit"
        >
          {spinner ? <Spinner color="info" /> : "Add Product"}
        </Button>
      </Form>
    </Formik>
  );
};

export default AddProduct;
