import { input } from "@/lib/styles";
import cn from "@/lib/utils/cn";
import { useField } from "formik";
import { Input, Label } from "keep-react";
import { useId } from "react";

const InputComp = ({
  placeholder,
  className,
  inputClassName,
  type,
  name,
  label,
  disabled,
  ...props
}) => {
  const inputID = useId();
  const [field, { error, touched }] = useField({ name });
  return (
    <fieldset className={cn("w-full max-w-md", className)}>
      <Label htmlFor={inputID} className={input.label}>
        {label}
      </Label>
      <Input
        className={cn(input.base, inputClassName, error && input.error)}
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
