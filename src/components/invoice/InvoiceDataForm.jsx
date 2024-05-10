"use client";
import { DatePicker, Label } from "keep-react";
import Button from "../Button";
import ProductInput from "./ProductInput";
import { input } from "@/lib/styles";
import { Input } from "../formik/Input";
import { Form, Formik } from "formik";
import { invoiceSchema } from "@/lib/schemas/invoice";
import TotalPrice from "./TotalPrice";

const InvoiceDataForm = ({
  initialValues,
  setDate,
  date,
  handleSubmit,
  spinner,
  buttonText,
}) => {
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
                // singleDate={setDate}
                selected={date}
                onSelect={setDate}
                placeholder="Date / Month / Year"
              >
                <DatePicker.SingleDate />
              </DatePicker>
            </div>
          </div>
        </div>
        <ProductInput disabled={spinner} />
        <div className="mt-4 flex flex-col items-end gap-4">
          <TotalPrice />
          <div className="w-full max-w-60">
            <Button variant="primary" disabled={spinner} type="submit">
              {buttonText}
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default InvoiceDataForm;
