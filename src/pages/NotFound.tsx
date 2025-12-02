import { Rabbit } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import PageWrapper from "components/wrappers/PageWrapper";

export default function NotFound() {
  const theme = useSelector((state: RootState) => state.theme.value);

  return (
    <PageWrapper heading="OOPS">
      <div
        className="flex flex-col items-center justify-center h-screen px-4 text-center"
        style={{ "--themeColor": theme } as React.CSSProperties}
      >
        <div className="flex flex-col items-center gap-4" data-aos="zoom-in">
          <Rabbit size={100} strokeWidth={1} />
          <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
          <p className="text-lg text-gray-600">
            Oops! The page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="px-6 py-3 mt-6 font-medium text-white rounded-md bg-[var(--themeColor)]"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
