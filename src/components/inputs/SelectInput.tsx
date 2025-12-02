import { ChevronDown } from "lucide-react";
import { InputHTMLAttributes } from "react";
import {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  inputOptions: { option: string; value?: string | number }[] | null;
  borderRadius?: number;
  backgroundColor?: string;
  registerName: Path<T>;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  errors?: FieldErrors<T>;
} & Omit<
  InputHTMLAttributes<HTMLSelectElement>,
  "type" | "placeholder" | "defaultValue" | "disabled" | "id"
>;

export default function SelectInput<T extends FieldValues>({
  label,
  placeholder,
  disabled,
  inputOptions,
  borderRadius,
  backgroundColor,
  registerName,
  register,
  validation = {},
  errors,
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
        style={{ borderRadius, backgroundColor }}
        className={`${
          disabled && "bg-[#F9FAFB] text-[#667085]"
        }  relative flex items-center w-full border border-[#111111d9] rounded-xl overflow-hidden pr-[.875rem] gap-2 cursor-pointer`}
      >
        <select
          defaultValue=""
          id={`input${registerName}`}
          disabled={disabled}
          {...props}
          {...register(registerName, validation)}
          className="p-[.875rem] placeholder:text-[#667085] outline-none appearance-none outline-0 ring-0 pr-7 w-full bg-transparent z-[1] cursor-pointer"
        >
          <option value="" disabled>
            {placeholder || label}
          </option>
          {inputOptions &&
            inputOptions.map((option, index) => (
              <option
                key={`${option.value}${index}`}
                value={option.value || option.option}
              >
                {option.option}
              </option>
            ))}
        </select>
        <div className="w-5 absolute top-1/2 -translate-y-1/2 right-[.875rem]">
          <ChevronDown size={20} />
        </div>
      </div>

      {errors?.[registerName] && (
        <span className="text-sm text-red-500">
          {errors[registerName]?.message as string}
        </span>
      )}
    </div>
  );
}
