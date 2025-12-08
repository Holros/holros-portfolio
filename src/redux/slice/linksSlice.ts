import { createSlice } from "@reduxjs/toolkit";
import homeIcon from "/icon/icons8-home-150.png";
import altHomeIcon from "/icon/icons8-home-100.png";
import aboutIcon from "/icon/icons8-customer-100.png";
import altAboutIcon from "/icon/icons8-customer-100 (1).png";
import projectIcon from "/icon/icons8-desktop-100.png";
import altProjectIcon from "/icon/icons8-desktop-100 (1).png";
import contactIcon from "/icon/icons8-call-100.png";
import altContactIcon from "/icon/icons8-call-100 (1).png";

const linksOptions = {
  name: "links",
  initialState: {
    value: [
      { name: "Home", to: "/", img: homeIcon, altImg: altHomeIcon },
      { name: "About Me", to: "/about", img: aboutIcon, altImg: altAboutIcon },
      {
        name: "Projects",
        to: "/projects",
        img: projectIcon,
        altImg: altProjectIcon,
      },
      {
        name: "Contact",
        to: "/contact",
        img: contactIcon,
        altImg: altContactIcon,
      },
      // {
      //   name: "Edit",
      //   to: "/edit",
      //   img: "/icon/editIcon.png",
      //   altImg: "/icon/editIconWhite.png",
      // },
    ],
  },
  reducers: {},
};

const linksSlice = createSlice(linksOptions);

export default linksSlice.reducer;
