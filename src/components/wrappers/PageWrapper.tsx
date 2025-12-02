import Heading from "components/general/Heading";
import React from "react";
import { useLocation } from "react-router-dom";

export default function PageWrapper({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-6 grow">
      {location.pathname !== "/" && <Heading name={heading} />}
      <div className={`grow ${location.pathname !== "/" && "mr-[45px]"}`}>
        {children}
      </div>
    </div>
  );
}
