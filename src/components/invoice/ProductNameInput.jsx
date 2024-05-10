"use client";
import { useField } from "formik";
import { useState } from "react";
import cn from "@/lib/utils/cn";
import { focus, input } from "@/lib/styles";

const ProductNameInput = ({ index, disabled }) => {
  const priceField = useField({ name: `products[${index}].price` });
  const productField = useField({ name: `products[${index}].productName` });
  const productIdField = useField({ name: `products[${index}].productId` });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [allData, setAllData] = useState([]);

  const handleProductSet = (productData) => {
    priceField[2].setValue(productData?.sell);
    productField[2].setValue(productData?.productName);
    productIdField[2].setValue(productData?.id);
    setAllData([]);
    setIsFetching(false);
  };

  const controller = new AbortController();
  const { signal } = controller;

  const handleChange = async (e) => {
    const inputValue = e.target.value;
    productField[2].setValue(inputValue);
    try {
      setIsLoading(true);
      setIsFetching(true);
      setIsError(false);
      const res = await fetch(`/api/product?q=${inputValue}`, { signal });
      if (!res.ok) {
        setIsError(true);
      }
      const data = await res.json();
      setAllData(data?.data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div>
        <input
          type="text"
          className={cn(
            input.minimal,
            focus.base,
            productField[1].error && productField[1].touched && focus.error,
          )}
          placeholder="Product name"
          name={`products[${index}].productName`}
          value={productField[0].value}
          autoComplete="off"
          onChange={handleChange}
          disabled={disabled}
        />
        {productField[1].error && productField[1].touched && (
          <p className="-mb-1 text-xs text-red-500">{productField[1].error}</p>
        )}
      </div>
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

export default ProductNameInput;
