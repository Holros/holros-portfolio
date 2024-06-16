import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeading } from "../redux/slice/headingSlice";
import { useSelector } from "react-redux";

const Resume = () => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeading("RESUME"));
  }, [dispatch]);
  return (
    <div style={{ "--themeColor": theme }}>
      <p className="font-[montserrat] text-xl mb-5">
        Click the link below to view <span className="font-bold">resume</span>
      </p>
      <div className="my-[7vh] flex justify-center">
        {" "}
        <a
          rel="noreferrer"
          href="https://drive.google.com/file/d/1ZWAxXzQJSRDnfk1wK4tpYBDPKFz_rI-k/view?usp=drive_link"
          target="_blank"
          className="px-6 py-3 bg-[var(--themeColor)] hover:text-gray-700 text-white rounded-lg font-bold text-lg"
        >
          View Resume{" "}
        </a>
      </div>
    </div>
  );
};

export default Resume;
