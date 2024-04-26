import { input } from "@/lib/styles";
import cn from "@/lib/utils/cn";
import { Input, Label } from "keep-react";
import { useId } from "react";

const InputComp = ({
  placeholder,
  className,
  inputClassName,
  type,
  label,
  disabled,
  ...props
}) => {
  const inputID = useId();
  return (
    <fieldset className={cn("w-full max-w-md", className)}>
      <Label htmlFor={inputID} className={input.label}>
        {label}
      </Label>
      <Input
        className={cn(input.base, inputClassName)}
        id={inputID}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
    </fieldset>
  );
};

export { InputComp as Input };
