"use client";
import { Input } from "@/components/formik/Input";
import { FieldArray, Form, Formik, useField } from "formik";
import { DatePicker, Label } from "keep-react";
import { useEffect, useState } from "react";
import { ImBin } from "react-icons/im";
import { invoiceSchema } from "@/lib/schemas/invoice";
import Alert from "@/lib/config/alert.config";
import { focus, input } from "@/lib/styles";
import Button from "@/components/Button";
import Table from "@/components/table";
import cn from "@/lib/utils/cn";
import createInvoice from "@/lib/actions/invoice/createInvoice";

const InvoiceForm = ({ invoiceId }) => {
  const [spinner, setSpinner] = useState(false);
  const [date, setDate] = useState(new Date());

  const initialValues = {
    invoiceId: invoiceId,
    name: "",
    address: "",
    products: [
      {
        productId: "",
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
        invoiceId: +e.invoiceId,
        invoiceDate: date.toISOString(),
        products: {
          create: e.products.map((ele) => ({
            productId: ele.productId,
            quantity: +ele.quantity,
            totalPrice: +ele.quantity * ele.price,
          })),
        },
        totalPrice: e.products.reduce(
          (sum, curr) => sum + parseInt(curr.quantity) * curr.price,
          0,
        ),
      };
      const res = await createInvoice(
        { name: e.name, address: e.address },
        invoiceData,
      );
      console.log(res);
      Alert.fire({
        icon: "success",
        title: "Invoice is created!",
      });
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
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex-1 max-md:order-2">
            <Input
              className="mb-2 w-full max-w-xs"
              name="name"
              type="text"
              placeholder="Customer Name"
              label="Customer Name"
              disabled={spinner}
              required
            />
            <Input
              className="w-full"
              name="address"
              type="text"
              placeholder="Customer Address"
              label="Customer Address"
              disabled={spinner}
              required
            />
          </div>
          <div className="w-full max-w-52 max-md:order-1">
            <Input
              className="mb-2"
              name="invoiceId"
              type="text"
              placeholder="Invoice id"
              label="Invoice id"
              disabled={true}
              required
            />
            <div>
              <Label className={input.label}>Invoice date</Label>
              <DatePicker
                className="border-gray-500 bg-transparent p-2"
                singleDate={setDate}
                placeholder="Date / Month / Year"
              >
                <DatePicker.SingleDate />
              </DatePicker>
            </div>
          </div>
        </div>
        <ProductInput disabled={spinner} />
        <div>
          <TotalPrice />
          <Button size="sm" variant="primary" disabled={spinner} type="submit">
            Make Invoice
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

const TotalPrice = () => {
  const [{ value }] = useField({ name: "products" });

  const sum = value.reduce(
    (sum, curr) => sum + parseInt(curr.quantity) * curr.price,
    0,
  );

  return <div className="ml-auto w-full max-w-60">Total price: {sum || 0}</div>;
};

const ProductInput = ({ disabled }) => {
  const [field] = useField({ name: "products" });

  return (
    <FieldArray
      name="products"
      {...field}
      render={(arrayHelpers) => (
        <>
          <div className="flex justify-end">
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
              Add product
            </Button>
          </div>
          <table className="my-2 w-full table-fixed border border-gray-300 dark:border-gray-600">
            <Table.head>
              <Table.headCell className="min-w-72">Product name</Table.headCell>
              <Table.headCell className="min-w-24">Quantity</Table.headCell>
              <Table.headCell className="min-w-24">Price</Table.headCell>
              <Table.headCell className="min-w-24">Total Price</Table.headCell>
            </Table.head>
            <Table.body>
              {field.value.map(({ productName }, index) => (
                <Table.row
                  className="bg-transparent odd:bg-transparent even:bg-transparent hover:bg-transparent"
                  key={"productInput" + index}
                >
                  <Table.cell>
                    <ProductName
                      index={index}
                      productName={productName}
                      disabled={disabled}
                    />
                  </Table.cell>
                  <Table.cell>
                    <InputData
                      placeholder="Quantity"
                      name={`products[${index}].quantity`}
                      disabled={disabled}
                    />
                  </Table.cell>
                  <Table.cell>
                    <InputData
                      placeholder="Price"
                      name={`products[${index}].price`}
                      disabled={true}
                    />
                  </Table.cell>
                  <Table.cell>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg">
                        {field.value[index].quantity * field.value[index].price}
                      </span>
                      <Button
                        onClick={() => arrayHelpers.remove(index)}
                        shape="icon-button"
                        variant="cancel"
                        disabled={disabled}
                      >
                        <ImBin size={12} />
                      </Button>
                    </div>
                  </Table.cell>
                </Table.row>
              ))}
            </Table.body>
          </table>
        </>
      )}
    />
  );
};

const ProductName = ({ productName, index, disabled }) => {
  const priceField = useField({ name: `products[${index}].price` });
  const productField = useField({ name: `products[${index}].productName` });
  const productIdField = useField({ name: `products[${index}].productId` });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (productName.length > 0) {
      (async () => {
        try {
          setIsLoading(true);
          setIsFetching(true);
          setIsError(false);
          const res = await fetch(`/api/product?q=${productName}`);
          if (!res.ok) {
            throw new Error("Error");
          }
          const data = await res.json();
          setAllData(data?.data);
        } catch {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      setAllData([]);
      setIsFetching(false);
    }
  }, [productName]);

  const handleProductSet = (productData) => {
    priceField[2].setValue(productData?.sell);
    productField[2].setValue(productData?.productName);
    productIdField[2].setValue(productData?.id);
    setAllData([]);
    setIsFetching(false);
  };

  return (
    <div className="relative">
      <InputData
        placeholder="Product name"
        name={`products[${index}].productName`}
        autoComplete="off"
        disabled={disabled}
      />
      {isFetching && (
        <div className="absolute left-0 right-0 top-full z-50 clear-both w-full max-w-xs overflow-hidden rounded border border-gray-400 bg-gray-300 shadow-md dark:border-gray-600 dark:bg-gray-700">
          {isLoading ? (
            <div className="p-2">Loading....</div>
          ) : isError ? (
            <div className="p-2">Error to get product data</div>
          ) : (
            allData?.map((ele, idx) => (
              <button
                onClick={() => handleProductSet(ele)}
                key={"search-item" + idx}
                className="flex w-full items-center justify-between gap-2 p-2 text-left"
                type="button"
              >
                <span>{ele.productName}</span>
                <span>Available: {ele.quantity}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const style = {
  base: "w-full bg-transparent focus:outline-none text-body-4 placeholder:font-normal placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50",
};

const InputData = ({ placeholder, name, disabled, ...props }) => {
  const [field, { error, touched }] = useField({ name });
  return (
    <div>
      <input
        type="text"
        className={cn(style.base, focus.base, error && touched && focus.error)}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        {...props}
        {...field}
      />
      {error && touched && (
        <p className="-mb-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default InvoiceForm;
