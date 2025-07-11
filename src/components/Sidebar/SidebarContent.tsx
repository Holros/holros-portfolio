import { useDispatch, useSelector } from "react-redux";
import profilePicture from "../../static/img/1717961869505.jpg";
// import {
//   setToBlue,
//   setToDefault,
//   setToGreen,
//   setToOrange,
//   setToIndigo,
//   setToTeal,
// } from "../redux/slice/themeSlice";
import { NavLink } from "react-router-dom";
import { openModal } from "../../redux/slice/modalSlice";
import { RootState } from "../../redux/store";
import Image from "../general/Image";

const SidebarContent = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.value);
  const linksArray = useSelector((state: RootState) => state.links.value);

  return (
    <>
      <div className="w-full basis-[28%] min-h-[75px] flex overflow-hidden justify-center items-center">
        <Image
          src={profilePicture}
          alt="profile"
          height={3}
          width={2}
          className="object-cover max-w-full max-h-full min-w-full min-h-full"
        />
      </div>
      <div
        className={`basis-[72%] flex flex-col px-2 py-5 gap-4 items-center font-[bold] text-xl`}
        style={{ backgroundColor: theme }}
      >
        •
        {/* {[
          { name: "Default", func: setToDefault },
          { name: "Blue", func: setToBlue },
          { name: "Green", func: setToGreen },
          { name: "Indigo", func: setToIndigo },
          { name: "Orange", func: setToOrange },
          { name: "Teal", func: setToTeal },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => dispatch(item.func())}
            className="text-black relative text-xl hover:text-white font-bold font-[montserrat] after:absolute after:w-[1px] after:h-[1.1rem] after:bg-black after:top-[100%] after:left-[50%] first:before:absolute first:before:w-[1px] first:before:h-[1.1rem] first:before:bg-black first:before:bottom-[100%] first:before:left-[50%] "
          >
            {item.name}
          </button>
        ))} */}
        {linksArray.map((item) => (
          <NavLink
            to={item.to}
            key={item.name}
            className={({ isActive }) =>
              `text-black relative text-xl hover:text-white font-bold font-[montserrat] after:absolute after:w-[1px] after:h-[1.1rem] after:bg-black after:top-[100%] after:left-[50%] first:before:absolute first:before:w-[1px] first:before:h-[1.1rem] first:before:bg-black first:before:bottom-[100%] first:before:left-[50%] ${
                isActive ? "text-white" : ""
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
        <button
          onClick={() => dispatch(openModal())}
          className="text-black relative text-xl hover:text-white font-bold font-[montserrat] after:absolute after:w-[1px] after:h-[1.1rem] after:bg-black after:top-[100%] after:left-[50%]"
        >
          Change Theme
        </button>
        •
      </div>
    </>
  );
};

export default SidebarContent;
