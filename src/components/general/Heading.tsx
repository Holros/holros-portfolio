const Heading = ({ name }: { name: string }) => {
  return (
    <h1 className="w-full flex justify-center p-4 font-bold border border-black text-4xl">
      {name}
    </h1>
  );
};

export default Heading;
