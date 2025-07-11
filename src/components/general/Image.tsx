import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Image({
  alt,
  width,
  height,
  className,
  notLazy,
  src,
}: {
  alt?: string;
  width: number;
  height: number;
  className?: string;
  notLazy?: boolean;
  src: string;
}) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded animate-pulse z-1">
          <Loader2 className="text-primary animate-spin" size={40} />
        </div>
      )}
      <img
        decoding={notLazy ? "sync" : "async"}
        loading={notLazy ? "eager" : "lazy"}
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
        }}
        height={height}
        width={width}
        className={`${className ? className : "w-full h-auto max-w-full"} ${
          loading ? "invisible relative" : "visible relative"
        }`}
      />
    </div>
  );
}
