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
      <Label htmlFor={inputId}>{label}</Label>
      <div className="relative">
        <Input
          id={inputId}
          type={showPass ? "text" : "password"}
          className="text-gray-100 mt-1 bg-transparent"
          placeholder={placeholder}
          disabled={disabled}
          {...field}
          {...props}
        />
        <button
          onClick={() => setShowPass((l) => !l)}
          className="text-gray-500 absolute right-2 top-1/2 z-30 -translate-y-1/2 p-2"
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
