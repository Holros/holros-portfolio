import { createSlice } from "@reduxjs/toolkit";

const localTheme = localStorage.getItem("theme");

interface InitialState {
  value: string
}

const initialState: InitialState ={
  value: localTheme ? JSON.parse(localTheme) : "#FFC107",
}

const themeOptions = {
  name: "theme",
  initialState ,
  reducers: {
    setToDefault : (state : InitialState) => {
        localStorage.setItem("theme", JSON.stringify("#FFC107"));
        state.value = "#FFC107";
    },
    setToBlue: (state : InitialState) => {
      localStorage.setItem("theme", JSON.stringify("#2196F3"));
      state.value = "#2196F3";
    },
    setToGreen: (state : InitialState) => {
      localStorage.setItem("theme", JSON.stringify("#4CAF50"));
      state.value = "#4CAF50";
    },
    setToIndigo: (state : InitialState) => {
      localStorage.setItem("theme", JSON.stringify("#7887d8"));
      state.value = "#7887d8";
    },
    setToOrange: (state : InitialState) => {
      localStorage.setItem("theme", JSON.stringify("#FF5722"));
      state.value = "#FF5722";
    },
    setToTeal: (state : InitialState) => {
      localStorage.setItem("theme", JSON.stringify("#009688"));
      state.value = "#009688";
    },
  },
};

const themeSlice = createSlice(themeOptions);

export const { setToDefault,setToBlue, setToGreen, setToIndigo, setToOrange, setToTeal } =
  themeSlice.actions;
export default themeSlice.reducer;
