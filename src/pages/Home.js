import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../redux/slice/modalSlice";
import profilePicture from "../static/img/1717961869505.jpg";

const Home = () => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  return (
    <>
      {/* <Heading name={"HOME"}/> */}
      <div
        className="flex flex-col font-bold font-[montserrat] h-[100vh]  md:flex-row-reverse md:overflow-hidden overflow-x-auto justify-start "
        style={{ "--themeColor": theme }}
      >
        <div className="basis-[45%] max-h-[50%] md:max-h-none bg-white">
          <img
            src={profilePicture}
            alt="profile"
            className="w-auto min-w-full h-full object-cover"
          />
        </div>
        <div className="basis-[55%] flex justify-center p-5 flex-col gap-5 bg-white">
          <p className="text-3xl mb-[-8px]">HI THERE!</p>
          <div className="flex flex-col gap-2 items-start">
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
          <p className="font-normal text-[15px]">
            I'm a front-end developer who enjoys creating responsive and
            user-friendly web applications with HTML, CSS, JavaScript, React.js,
            Redux, and Tailwind CSS. I focus on delivering great web experiences
            through effective API integration and performance optimization.{" "}
          </p>
          <div className="flex flex-wrap gap-3 items-start">
            <Link
              to="about"
              className="bg-[var(--themeColor)] text-white hover:text-gray-700 px-4 py-4 rounded-full text-sm"
            >
              MORE ABOUT ME
            </Link>
            <a
              href="https://drive.google.com/file/d/1ElsIY3JxdyeKIewhPT3ysbcxj3xcYZGr/view?usp=drive_link"
              target="_target"
              rel="noreferrer"
              className="bg-gray-700 text-[var(--themeColor)] hover:text-white px-4 py-4 rounded-full text-sm"
            >
              VIEW RESUME
            </a>
            <button
              className="bg-gray-700 text-[var(--themeColor)] hover:text-white px-4 py-4 rounded-full text-sm"
              onClick={() => dispatch(openModal())}
            >
              CHANGE THEME
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
