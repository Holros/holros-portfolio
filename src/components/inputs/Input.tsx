import {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";
import { Dispatch, InputHTMLAttributes, SetStateAction } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps<T extends FieldValues> = {
  label?: string;
  placeholder: string;
  disabled?: boolean;
  defaultValue?: string;
  registerName: Path<T>;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  borderRadius?: number;
  borderColor?: string;
  errors?: FieldErrors<T>;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "placeholder" | "defaultValue" | "disabled" | "id"
>;

export default function Input<T extends FieldValues>({
  label,
  type,
  placeholder,
  disabled,
  defaultValue,
  registerName,
  borderColor,
  borderRadius,
  register,
  validation = {},
  errors,
  showPassword,
  setShowPassword,
  // accept every other props and pass it to the input element
  ...props
}: InputProps<T>) {
  return (
    <div className="gap-[.375rem] flex flex-col">
      {label && (
        <label htmlFor={`input${registerName}`} className="font-medium">
          {label}
        </label>
      )}
      <div
        style={{ borderRadius, borderColor }}
        className={`${
          disabled && "bg-[#F9FAFB] text-[#667085]"
        } flex items-center border border-[#111111d9] rounded-xl overflow-hidden`}
      >
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          id={`input${registerName}`}
          {...register(registerName, validation)}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          className="w-full p-[.875rem] placeholder:text-[#667085] outline-none appearance-none outline-0 ring-0"
          onWheel={(e) => e.currentTarget.blur()} // Prevent scroll on input
          {...props} // Spread any additional props to the input element
        />
        {type === "password" && setShowPassword && (
          <div
            onClick={() => {
              setShowPassword((value) => !value);
            }}
            className="py-2 pr-2 cursor-pointer"
          >
            {showPassword === false ? (
              <Eye strokeWidth={1.5} color="#111111d9" />
            ) : (
              <EyeOff strokeWidth={1.5} color="#111111d9" />
            )}
          </div>
        )}
      </div>

      {errors?.[registerName] && (
        <span className="text-sm text-red-500">
          {errors[registerName]?.message as string}
        </span>
      )}
    </div>
  );
}
