import { useField } from "formik";
import { Input, Label } from "keep-react";
import { useId } from "react";

const InputComp = ({ placeholder, type, name, label, disabled, ...props }) => {
  const inputID = useId();
  const [field, { error, touched }] = useField({ name });
  return (
    <fieldset className="w-full max-w-md">
      <Label htmlFor={inputID}>{label}</Label>
      <Input
        className="text-gray-100 mt-1 bg-transparent"
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
