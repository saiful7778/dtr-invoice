"use client";
import { Input } from "@/components/formik/Input";
import { FieldArray, Form, Formik, useField } from "formik";
import { DatePicker, Label, Table } from "keep-react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { ImBin } from "react-icons/im";
import { invoiceSchema } from "@/lib/schemas/invoice";
import Alert from "@/lib/config/alert.config";
import createData from "@/lib/CURD/createData";
import { input } from "@/lib/styles";
import Button from "@/components/Button";

const InvoiceForm = () => {
  const [spinner, setSpinner] = useState(false);
  const [date, setDate] = useState(new Date());

  const initialValues = {
    invoiceID: uuid().split("-")[0],
    customerName: "",
    customenrAddress: "",
    products: [
      {
        productName: "",
        quantity: 0,
        price: 0,
        totalPrice: 0,
      },
    ],
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
      const invoiceData = {
        invoiceID: e.invoiceID,
        customerName: e.customerName,
        customenrAddress: e.customenrAddress,
        invoiceDate: date.toISOString(),
        products: e.products,
      };
      const res = await createData("/invoice", invoiceData);
      if (res.success) {
        Alert.fire({
          icon: "success",
          title: "Invoice is created!",
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
      validationSchema={invoiceSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-2">
        <Input
          name="invoiceID"
          type="text"
          placeholder="Invoice id"
          label="Invoice id"
          disabled={spinner}
          required
        />
        <div className="w-full max-w-xs">
          <Label className={input.label}>Invoice date</Label>
          <DatePicker
            className="border-gray-500 bg-transparent p-2"
            singleDate={setDate}
            placeholder="Date / Month / Year"
          >
            <DatePicker.SingleDate />
          </DatePicker>
        </div>
        <Input
          name="customerName"
          type="text"
          placeholder="Customer Name"
          label="Customer Name"
          disabled={spinner}
          required
        />
        <Input
          name="customenrAddress"
          type="text"
          placeholder="Customer Address"
          label="Customer Address"
          disabled={spinner}
          required
        />
        <ProductInput />
        <div>
          <Button size="sm" variant="primary" disabled={spinner} type="submit">
            Make Invoice
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

const ProductInput = () => {
  const [field] = useField({ name: "products" });

  return (
    <>
      <FieldArray
        name="products"
        {...field}
        render={(arrayHelpers) => (
          <>
            <Table className="bg-transparent">
              <Table.Head className="bg-transparent">
                <Table.HeadCell className="min-w-80 px-2 py-1">
                  Product name
                </Table.HeadCell>
                <Table.HeadCell className="min-w-32 px-2 py-1">
                  Qualtity
                </Table.HeadCell>
                <Table.HeadCell className="min-w-40 px-2 py-1">
                  Price
                </Table.HeadCell>
                <Table.HeadCell className="min-w-20 px-2 py-1">
                  Total Price
                </Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {field.value.map((data, index) => (
                  <Table.Row
                    className="bg-transparent odd:bg-transparent even:bg-transparent hover:bg-transparent"
                    key={"productInput" + index}
                  >
                    <Table.Cell className="px-0.5">
                      <Input
                        type="text"
                        placeholder="Product name"
                        name={`products[${index}].productName`}
                      />
                    </Table.Cell>
                    <Table.Cell className="px-0.5">
                      <Input
                        type="number"
                        placeholder="Quantity"
                        name={`products[${index}].quantity`}
                      />
                    </Table.Cell>
                    <Table.Cell className="px-0.5">
                      <Input
                        type="number"
                        placeholder="Price"
                        name={`products[${index}].price`}
                      />
                    </Table.Cell>
                    <Table.Cell className="px-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {field.value[index].quantity *
                            field.value[index].price}
                        </span>
                        <Button
                          onClick={() => arrayHelpers.remove(index)}
                          shape="icon-button"
                          variant="cancel"
                        >
                          <ImBin size={12} />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Button
              onClick={() =>
                arrayHelpers.push({
                  productName: "",
                  quantity: 0,
                  price: 0,
                  totalPrice: 0,
                })
              }
              size="sm"
              variant="confirm"
              type="button"
            >
              Add
            </Button>
          </>
        )}
      />
    </>
  );
};

export default InvoiceForm;
