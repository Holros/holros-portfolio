import {
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label?: string;
  placeholder: string;
  disabled?: boolean;
  defaultValue?: string;
  registerName: Path<T>;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  errors?: FieldErrors<T>;
};

export default function TextFieldInput<T extends FieldValues>({
  label,
  placeholder,
  disabled,
  defaultValue,
  registerName,
  register,
  validation = {},
  errors,
}: InputProps<T>) {
  return (
    <div className="gap-[.375rem] flex flex-col">
      {label && (
        <label htmlFor={`input${registerName}`} className="font-medium">
          {label}
        </label>
      )}
      <textarea
        id={`input${registerName}`}
        {...register(registerName, validation)}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        className="w-full border border-[#111111d9] p-[.875rem] rounded-xl placeholder:text-[#667085] outline-none appearance-none outline-0 ring-0  resize-none"
        rows={5}
      ></textarea>
      {errors?.[registerName] && (
        <span className="text-sm text-red-500">
          {errors[registerName]?.message as string}
        </span>
      )}
    </div>
  );
}
