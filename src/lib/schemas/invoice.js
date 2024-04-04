import * as yup from "yup";

export const invoiceSchema = yup.object().shape({
  invoiceID: yup.string().required("Invoice ID is required"),
  customerName: yup.string().required("Customer name is required"),
  customenrAddress: yup.string().required("Address is required"),
  products: yup.array().of(
    yup.object().shape({
      productName: yup.string().required("Product name is required"),
      quantity: yup
        .number()
        .min(1, "Please input quantity")
        .required("Quantity is required"),
      price: yup
        .number()
        .min(1, "Please input price")
        .required("Price is required"),
    }),
  ),
});
