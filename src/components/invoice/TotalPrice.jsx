import { useField } from "formik";

const TotalPrice = () => {
  const [{ value }] = useField({ name: "products" });

  const sum = value.reduce(
    (sum, curr) => sum + parseInt(curr.quantity) * curr.price,
    0,
  );

  return <div className=" w-full max-w-60">Total price: {sum || 0}</div>;
};
export default TotalPrice;
