import { createSlice } from "@reduxjs/toolkit";
import homeIcon from "../../static/icon/icons8-home-150.png";
import altHomeIcon from "../../static/icon/icons8-home-100.png";
import aboutIcon from "../../static/icon/icons8-customer-100.png";
import altAboutIcon from "../../static/icon/icons8-customer-100 (1).png";
import projectIcon from "../../static/icon/icons8-desktop-100.png";
import altProjectIcon from "../../static/icon/icons8-desktop-100 (1).png";
// import resumeIcon from "../../static/icon/icons8-resume-100.png";
// import altResumeIcon from "../../static/icon/icons8-resume-100 (1).png";
import contactIcon from "../../static/icon/icons8-call-100.png";
import altContactIcon from "../../static/icon/icons8-call-100 (1).png";

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
      } /* 
      { name: "Resume", to: "/resume", img: resumeIcon, altImg: altResumeIcon }, */,
      {
        name: "Contact",
        to: "/contact",
        img: contactIcon,
        altImg: altContactIcon,
      },
    ],
  },
  reducers: {}
};

const linksSlice = createSlice(linksOptions);

export default linksSlice.reducer;
