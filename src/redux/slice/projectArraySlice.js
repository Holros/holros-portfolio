import { createSlice } from "@reduxjs/toolkit";
import portfolio from "../../static/img/portfolio.png";
import eItrams from "../../static/img/e-itrams.png";
import visiting from "../../static/img/vmft.png";
import medinotation from "../../static/img/medinotation.png";
import webShop from "../../static/img/webshop.png";
import filesClone from "../../static/img/filesClone.png";
import stopWatch from "../../static/img/stopwatch.png";
import coin from "../../static/img/coin.png";
import games from "../../static/img/games.png";
import calculator from "../../static/img/calculator.png"

const projectArrayOptions = {
  name: "projectArray",
  initialState: {
    value: [
      {
        img: portfolio,
        tools: ["React", "Redux", "HTML", "JS", "Tailwind CSS"],
        link: "https://holros.netlify.app/",
        github: "https://github.com/Holros/holros-portfolio",
      },
      {
        img: eItrams,
        tools: ["React", "HTML", "CSS", "JS"],
        link: "https://e-itrams.netlify.app/",
        github: null,
      },

      {
        img: visiting,
        tools: ["React", "HTML", "CSS", "JS"],
        link: "https://visitingmyfriendtravels.co.za/",
        github: null,
      },
      {
        img: medinotation,
        tools: ["HTML", "CSS", "JS"],
        link: "https://medinotation.com/",
        github: null,
      },
      {
        img: games,
        tools: ["React", "Redux", "HTML", "JS", "Tailwind CSS"],
        link: "https://holros-games.netlify.app/",
        github:
          "https://github.com/Holros/my_wisdom_inc_test---Olamide-s-Games",
      },
      {
        img: webShop,
        tools: ["React", "HTML", "CSS", "JS"],
        link: "https://holros-web-shop.netlify.app/",
        github: "https://github.com/Holros/web-shop",
      },
      {
        img: calculator,
        tools: ["React", "HTML", "JS", "Tailwind CSS"],
        link: "https://holros-calculator.vercel.app/",
        github: "https://github.com/Holros/my_wisdom_inc_test",
      },
      {
        img: stopWatch,
        tools: ["HTML", "CSS", "JS"],
        link: "https://holros-stopwatch.netlify.app/",
        github: "https://github.com/Holros/Holros--Stopwatch",
      },
      {
        img: filesClone,
        tools: ["React", "HTML", "CSS", "JS"],
        link: "https://files-clone-project.netlify.app/",
        github: "https://github.com/Holros/files.com-clone-project",
      },
      {
        img: coin,
        tools: ["HTML", "CSS", "JS"],
        link: "https://github.com/Holros/CoinUnited",
        github: "https://github.com/Holros/CoinUnited",
      },
    ],
  },
};

const projectArraySlice = createSlice(projectArrayOptions);

export default projectArraySlice.reducer;
