import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { ComponentProps} from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export default function FancyButton({
  text,
  isLoading,
  disabled,
  ...props
}: {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
} & ComponentProps<"button">) {
  const theme = useSelector((state: RootState) => state.theme.value);
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      style={{ "--themeColor": theme } as React.CSSProperties}
      className={`${"bg-[black] hover:!bg-[#111111d9] text-white"} ${"gap-6"} ${"justify-between w-full"} rounded-full pl-4 p-3 leading-[100%] flex items-center shrink-0 w-fit !opacity-100 disabled:!opacity-70`}
    >
      <p className="">{text}</p>
      <div
        className={`${"bg-white text-[black]"} ${
          isLoading && "animate-spin"
        } p-2 rounded-full`}
      >
        {isLoading ? <LoaderCircle size={20} /> : <ArrowUpRight size={20} />}
      </div>
    </button>
  );
}
