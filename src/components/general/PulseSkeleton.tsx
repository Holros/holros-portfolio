export default function PulseSkeleton({
  width,
  height,
  maxWidth,
  borderRadius = 8,
  backgroundColor = "#e5e7eb",
}: {
  width: number | `${number}%` | "auto";
  height: number | `${number}%` | "auto";
  maxWidth?: number | `${number}%` | "auto";
  borderRadius?: number | `${number}%`;
  backgroundColor?: string;
}) {
  return (
    <div
      style={{
        width,
        height,
        maxWidth,
        backgroundColor,
        borderRadius,
      }}
      className="animate-pulse"
    />
  );
}
