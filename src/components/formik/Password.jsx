import { useId, useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useField } from "formik";
import { Input, Label } from "keep-react";

const Password = ({ placeholder, label, disabled, name, ...props }) => {
  const [showPass, setShowPass] = useState(false);
  const [field, { error, touched }] = useField({ name });
  const inputId = useId();

  return (
    <fieldset className="w-full max-w-md">
      <Label htmlFor={inputId} className="dark:text-gray-200">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={inputId}
          type={showPass ? "text" : "password"}
          className="border border-gray-300 bg-transparent placeholder:text-gray-500 focus-visible:ring-gray-400 focus-visible:ring-offset-0 dark:border-gray-500 dark:text-white"
          placeholder={placeholder}
          disabled={disabled}
          {...field}
          {...props}
        />
        <button
          onClick={() => setShowPass((l) => !l)}
          className="absolute right-2 top-1/2 z-30 -translate-y-1/2 p-2 text-gray-500"
          type="button"
        >
          {showPass ? <IoIosEye size={25} /> : <IoIosEyeOff size={25} />}
        </button>
      </div>
      {error && touched && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </fieldset>
  );
};

export default Password;
