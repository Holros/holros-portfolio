import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../redux/slice/modalSlice";
import profilePicture from "../static/img/1717961869505.jpg";
import { RootState } from "../redux/store";
import Image from "../components/general/Image";

const Home = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();
  return (
    <>
      {/* <Heading name={"HOME"}/> */}
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
            <p className="bg-[var(--themeColor)] py-1 px-2 text-sm">
              FRONTEND DEVELOPER
            </p>
          </div>
          <p className="font-normal text-[.9375rem]" data-aos="fade-up">
            I'm a front-end developer who enjoys creating responsive and
            user-friendly web applications with HTML, CSS, JavaScript, React.js,
            Redux, Next.js, Typescript and Tailwind CSS. I focus on delivering
            great web experiences through effective API integration and
            performance optimization.{" "}
          </p>
          <div className="z-10 flex flex-wrap items-start gap-3 bg-white">
            <Link
              to="about"
              className="bg-[var(--themeColor)] text-white hover:text-gray-700 px-4 py-4 rounded-full text-sm"
            >
              MORE ABOUT ME
            </Link>
            <a
              href="https://drive.google.com/file/d/1ISBZt9R_Asa4cYDk53XpLqg3aR69GtOe/view?usp=sharing"
              target="_target"
              rel="noreferrer"
              className="bg-gray-700 text-[var(--themeColor)] hover:text-white px-4 py-4 rounded-full text-sm"
            >
              VIEW RESUME
            </a>
            <div
              className="cursor-pointer bg-gray-700 text-[var(--themeColor)] hover:text-white px-4 py-4 rounded-full text-sm"
              onClick={() => dispatch(openModal())}
            >
              CHANGE THEME
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
