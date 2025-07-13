import React, { useEffect, useRef } from "react";
import SidebarContent from "./SidebarContent";
import { useLocation } from "react-router-dom";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  menuRef,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuRef: React.RefObject<HTMLImageElement | null>;
}) => {
  const mobileSideBarRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkIfClickIsOutside = (e: MouseEvent) => {
      if (
        mobileSideBarRef &&
        menuRef &&
        !mobileSideBarRef?.current?.contains(e.target as Node) &&
        !menuRef?.current?.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", checkIfClickIsOutside);
    return () => {
      document.removeEventListener("click", checkIfClickIsOutside);
    };
  }, [menuRef, setIsSidebarOpen]);

  return (
    <>
      {/* Sidebar for smaller screen*/}
      <div
        ref={mobileSideBarRef}
        className={`fixed flex md:hidden h-full basis-[25%] w-[43%] flex-col overflow-y-auto overflow-x-hidden z-30 transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>
      {/* Sidebar for bigger screen */}
      {location.pathname !== "/" && (
        <div className="hidden md:flex h-[100vh] basis-[25%] w-[25%] flex-col fixed z-30 overflow-y-auto overflow-x-hidden">
          <SidebarContent />
        </div>
      )}
    </>
  );
};

export default Sidebar;
