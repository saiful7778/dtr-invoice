import { focus } from "@/lib/styles";
import cn from "@/lib/utils/cn";
import { useField } from "formik";
import React from "react";

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

export default InputData;
