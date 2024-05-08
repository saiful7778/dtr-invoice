import * as yup from "yup";

export const invoiceSchema = yup.object().shape({
  invoiceId: yup.string().required("Invoice ID is required"),
  name: yup.string().required("Customer name is required"),
  address: yup.string().required("Address is required"),
  products: yup.array().of(
    yup.object().shape({
      productId: yup.string().required("Product Id is required"),
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
