import { useField } from "formik";
import { Input, Label } from "keep-react";
import { useId } from "react";

const InputComp = ({ placeholder, type, name, label, disabled, ...props }) => {
  const inputID = useId();
  const [field, { error, touched }] = useField({ name });
  return (
    <fieldset className="w-full max-w-md">
      <Label htmlFor={inputID} className="dark:text-gray-100">
        {label}
      </Label>
      <Input
        className="dark: mt-1 bg-transparent
        text-gray-100"
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
