import { NavLink, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/general/sidebar/Sidebar";
import burgerIcon from "/icon/icons8-menu-black.png";
import cancelIcon from "/icon/icons8-cancel-black.png";
import changeIcon from "/icon/icons8-change-100.png";
import checkmarkIcon from "/icon/icons8-checkmark-90.png";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/general/Modal";
import { openModal } from "./redux/slice/modalSlice";
import {
  setToDefault,
  setToBlue,
  setToGreen,
  setToOrange,
  setToIndigo,
  setToTeal,
} from "./redux/slice/themeSlice";
import { RootState } from "./redux/store";
import Image from "./components/general/Image";
import ScrollToTop from "components/general/ScrollToTop";

const Layout = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const linksArray = useSelector((state: RootState) => state.links.value);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const menuRef = useRef<HTMLImageElement>(null);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div
      className={`${
        location.pathname !== "/" ? "bg-gray-200" : "bg-white"
      } flex font-montserrat`}
      id="scrollRel"
    >
      <Modal heading={"Change Theme"}>
        <p className={`text-lg font-bold pt-2 pb-4`} style={{ color: theme }}>
          Choose the color that best suits your style
        </p>
        <div
          className="flex flex-col items-start gap-4 p-1 rounded-xl"
          style={{ border: `1px solid ${theme}` }}
        >
          {[
            {
              name: "Amber (default)",
              color: "#FFC107",
              func: setToDefault,
            },
            { name: "Blue", color: "#2196F3", func: setToBlue },
            { name: "Green", color: "#4CAF50", func: setToGreen },
            { name: "Indigo", color: "#7887d8", func: setToIndigo },
            { name: "Orange", color: "#FF5722", func: setToOrange },
            { name: "Teal", color: "#009688", func: setToTeal },
          ].map((item) => (
            <div
              key={item.name}
              onClick={() => dispatch(item.func())}
              style={{ "--themeColor": theme } as React.CSSProperties}
              className={`text-black group font-bold  flex items-center gap-2 p-1 w-full hover:bg-[var(--themeColor)] hover:text-white rounded`}
            >
              <span
                className="w-6 h-6 border border-white rounded-full"
                style={{ backgroundColor: item.color }}
              >
                {" "}
              </span>
              {item.name}
              {theme === item.color && (
                <img
                  decoding="async"
                  loading="lazy"
                  height={1}
                  width={1}
                  src={checkmarkIcon}
                  alt="checkmark"
                  className="h-6 w-6 p-[1px] ml-2 rounded-full"
                  style={{ backgroundColor: theme }}
                />
              )}
            </div>
          ))}
        </div>
      </Modal>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menuRef={menuRef}
      />
      <div
        className={`relative w-full mx-auto min-h-[100vh] ${
          location.pathname === "/"
            ? "md:ml-auto"
            : "md:ml-[25%] py-5 px-3 max-w-[76rem]"
        }`}
      >
        <div className="flex flex-col gap-4 h-full">
          {/* header */}
          {location.pathname !== "/" && (
            <div className="flex items-center justify-between w-full gap-2 md:hidden sticky top-0 bg-gray-200 pt-1.5 pb-1.5 z-21">
              <h1
                className="p-2 text-white font-bold text-2xl rounded-lg"
                style={{ backgroundColor: theme }}
              >
                OLAMIDE
              </h1>
              <img
                decoding="async"
                loading="lazy"
                src={isSidebarOpen ? cancelIcon : burgerIcon}
                ref={menuRef}
                height={1}
                width={1}
                onClick={() => setIsSidebarOpen((value) => !value)}
                alt="burger nav"
                className="w-[2.1875rem] max-w-full h-auto z-30"
              />
            </div>
          )}
          <Outlet />
        </div>
        {/* Utility Widget */}
        <div className="fixed flex p-1 pl-0 items-center top-0 right-2 h-[100vh] z-20">
          <div
            className={`flex flex-col py-4 px-[2px] gap-3 max-h-[80vh] max-w-[100px] overflow-y-auto rounded-full`}
            style={{ backgroundColor: theme }}
          >
            {linksArray.map((item) => (
              <NavLink
                to={item.to}
                key={item.name}
                className={`relative p-1 rounded-full [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:w-[1px] [&:not(:last-child)]:after:h-[0.6rem] [&:not(:last-child)]:after:bg-black [&:not(:last-child)]:after:top-[100%] [&:not(:last-child)]:after:left-[50%] hover:border-y-2 hover:border-white `}
              >
                {({ isActive }) => (
                  <div className="w-[1.5625rem]">
                    <Image
                      height={1}
                      width={1}
                      src={isActive ? item.altImg : item.img}
                      alt="icons"
                      className="w-[25px] max-w-full h-auto"
                    />
                  </div>
                )}
              </NavLink>
            ))}
            <button
              className="relative p-1 rounded-full hover:border-y-2 hover:border-white [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:w-[1px] [&:not(:last-child)]:after:h-[0.6rem] [&:not(:last-child)]:after:bg-black [&:not(:last-child)]:after:top-[100%] [&:not(:last-child)]:after:left-[50%]"
              onClick={() => dispatch(openModal())}
            >
              <div className="w-[1.5625rem]">
                <Image
                  height={1}
                  width={1}
                  src={changeIcon}
                  alt="icons"
                  className="w-[25px] max-w-full h-auto"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};
export default Layout;
