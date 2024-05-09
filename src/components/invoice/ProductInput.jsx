import { FieldArray, useField } from "formik";
import Button from "../Button";
import Table from "../table";
import ProductName from "./ProductName";
import InputData from "./InputData";
import { ImBin } from "react-icons/im";

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

export default ProductInput;
