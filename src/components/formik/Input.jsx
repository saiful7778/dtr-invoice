import { useField } from "formik";
import { Input, Label } from "keep-react";
import { useId } from "react";

const InputComp = ({ placeholder, type, name, label, disabled, ...props }) => {
  const inputID = useId();
  const [field, { error, touched }] = useField({ name });
  return (
    <fieldset className="w-full max-w-md">
      <Label htmlFor={inputID} className="dark:text-gray-200">
        {label}
      </Label>
      <Input
        className="border border-gray-300 bg-transparent placeholder:text-gray-500 focus-visible:ring-gray-400 focus-visible:ring-offset-0 dark:border-gray-500 dark:text-white"
        id={inputID}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...field}
        {...props}
      />
      {error && touched && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </fieldset>
  );
};

export { InputComp as Input };
