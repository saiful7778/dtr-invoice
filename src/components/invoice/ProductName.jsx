"use client";
import { useField } from "formik";
import InputData from "./InputData";
import { useEffect, useState } from "react";

const ProductName = ({ productName, index, disabled }) => {
  const priceField = useField({ name: `products[${index}].price` });
  const productField = useField({ name: `products[${index}].productName` });
  const productIdField = useField({ name: `products[${index}].productId` });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (productName?.length > 0) {
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

export default ProductName;
