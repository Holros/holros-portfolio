import { InputHTMLAttributes, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import Input from "./Input";

type InputProps<T extends FieldValues> = {
  label?: string;
  placeholder: string;
  disabled?: boolean;
  defaultValue?: string;
  registerName: Path<T>;
  borderRadius?: number;
  borderColor?: string;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  errors?: FieldErrors<T>;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "placeholder" | "defaultValue" | "disabled" | "id"
>;

export default function PasswordInput<T extends FieldValues>({
  label,
  placeholder,
  disabled,
  defaultValue,
  registerName,
  borderColor,
  borderRadius,
  register,
  validation = {},
  errors,
  // accept every other props and pass it to the input element
  ...props
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      type="password"
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      borderColor={borderColor}
      borderRadius={borderRadius}
      disabled={disabled}
      defaultValue={defaultValue}
      label={label}
      registerName={registerName}
      placeholder={placeholder}
      register={register}
      errors={errors}
      validation={validation}
      {...props}
    />
  );
}
