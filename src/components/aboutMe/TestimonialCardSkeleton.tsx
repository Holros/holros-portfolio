import PulseSkeleton from "components/general/PulseSkeleton";
import { User2 } from "lucide-react";

export default function TestimonialCardSkeleton() {
  return (
    <div className="relative flex flex-col items-center justify-between w-full gap-8 p-3 pt-12 bg-gray-700 rounded-lg">
      <div className="absolute bg-gray-200 h-20 w-20 rounded-full top-0 left-[50%] -translate-y-1/2 -translate-x-1/2 flex justify-center items-center overflow-hidden animate-bounce">
        <User2 className="text-gray-700" size={50} />
      </div>
      <div className="flex flex-col gap-1 w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <PulseSkeleton key={i} width={"100%"} height={20} />
        ))}
      </div>
      <PulseSkeleton height={24.79} width={120} />
    </div>
  );
}
