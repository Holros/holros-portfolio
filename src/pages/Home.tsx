import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../redux/slice/modalSlice";
import profilePicture from "/img/1717961869505.jpg";
import { RootState } from "../redux/store";
import Image from "../components/general/Image";
import api from "../api/api";
import { useQuery } from "@tanstack/react-query";
import PulseSkeleton from "../components/general/PulseSkeleton";

const Home = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();

  const runOperation = async (): Promise<User> => {
    const response = await api.get("/user");
    return response.data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["/user"],
    queryFn: runOperation,
  });

  return (
    <>
      <div
        className="flex flex-col font-bold h-[100vh]  md:flex-row-reverse md:overflow-hidden overflow-x-auto justify-start "
        style={{ "--themeColor": theme } as React.CSSProperties}
      >
        <div className="basis-[45%] max-h-[50%] md:max-h-none bg-white">
          <Image
            src={profilePicture}
            alt="profile"
            height={3}
            width={2}
            className="object-cover w-auto h-full min-w-full"
          />
        </div>
        <div className="basis-[55%] flex justify-center p-5 flex-col gap-5 bg-white">
          <p className="text-3xl mb-[-0.5rem]" data-aos="zoom-in">
            HI THERE!
          </p>
          <div className="flex flex-col items-start gap-2" data-aos="fade-up">
            <p className="text-6xl">
              {" "}
              I'M{" "}
              <span className="text-[var(--themeColor)] font-[supernova]">
                OLAMIDE
              </span>
            </p>
            {isLoading || !data ? (
              <PulseSkeleton
                height={28}
                width={250}
                borderRadius={0}
                backgroundColor={theme}
              />
            ) : (
              <p className="bg-[var(--themeColor)] py-1 px-2 text-sm">
                {data.jobTitle}
              </p>
            )}
          </div>

          <div data-aos="fade-up">
            {isLoading || !data ? (
              <div className="flex flex-col gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <PulseSkeleton key={i} width={"100%"} height={19} />
                ))}
              </div>
            ) : (
              <p className="font-normal text-[.9375rem]">
                {data.landingPageAbout}
              </p>
            )}
          </div>
          <div className="z-10 flex flex-wrap items-start gap-3 bg-white">
            <Link
              to="/about"
              className="bg-[var(--themeColor)] text-white hover:text-gray-700 px-4 py-4 rounded-full text-sm"
            >
              MORE ABOUT ME
            </Link>
            {isLoading || !data ? (
              <PulseSkeleton borderRadius={99} height={52} width={138.74} />
            ) : (
              <a
                href={data.resumeLink}
                target="_target"
                rel="noreferrer"
                className="bg-gray-700 text-[var(--themeColor)] hover:text-white px-4 py-4 rounded-full text-sm"
              >
                VIEW RESUME
              </a>
            )}
            <div
              className="cursor-pointer bg-gray-700 text-[var(--themeColor)] hover:text-white px-4 py-4 rounded-full text-sm"
              onClick={() => dispatch(openModal())}
            >
              CHANGE THEME
            </div>
            <Link
              to="/edit"
              className="cursor-pointer bg-gray-700 text-[var(--themeColor)] hover:text-white px-4 py-4 rounded-full text-sm"
              onClick={() => dispatch(openModal())}
            >
              EDIT INFO
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
