import PulseSkeleton from "components/general/PulseSkeleton";

export default function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col gap-1.5 justify-between">
      <div className="relative flex aspect-[340/160] items-end w-full overflow-hidden rounded-lg shadow">
        <span className="absolute animate-pulse top-4 right-3 rounded-full bg-gray-800 z-1 h-[1.6138rem] w-[3.9737rem]" />
        <PulseSkeleton
          height={"100%"}
          width={"100%"}
          backgroundColor="#99a1af"
        />
      </div>
      <div className="flex flex-col w-full gap-4 px-3 py-4 bg-[#FAFAFA] rounded-lg grow">
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="rounded-full bg-[#EAECF0] w-[5.3894rem] h-[1.6138rem]"
            />
          ))}
        </div>
        {/*  */}
        <div className="flex items-center justify-between gap-2 border-t border-dashed pt-3">
          <>
            <PulseSkeleton width={75} height={20} />
            <PulseSkeleton width={75} height={20} />
          </>
        </div>
      </div>
    </div>
  );
}
