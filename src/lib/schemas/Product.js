import * as yup from "yup";

export const addProductSchema = yup.object().shape({
  productName: yup.string().required("Product name is required"),
  quantity: yup.number().required("Product quantity is required"),
  cost: yup.number().required("Product cost price is required"),
  sell: yup.number().required("Product sell price is required"),
});
