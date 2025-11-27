import Image from "../general/Image";
import { User2 } from "lucide-react";

export default function TestimonialCard({
  name,
  text,
  img,
}: {
  name: string;
  text: string;
  img: string;
}) {
  return (
    <div
      className="relative flex flex-col items-center justify-between w-full gap-8 p-3 pt-12 bg-gray-700 rounded-lg"
    >
      <div className="absolute bg-white h-20 w-20 rounded-full top-0 left-[50%] -translate-y-1/2 -translate-x-1/2 flex justify-center items-center overflow-hidden">
        {img ? (
          <Image
            src={img}
            alt="client"
            height={1}
            width={1}
            className="object-cover w-[5.3125rem] h-[5.3125rem] max-w-full"
          />
        ) : (
          <User2 className="text-gray-700" size={50} />
        )}
      </div>
      <p className="text-[var(--themeColor)] font-bold">
        "<span className="text-sm font-normal text-white">{text}</span>"
      </p>
      <p className="font-bold text-white">{name}</p>
    </div>
  );
}
