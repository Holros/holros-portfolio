import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slice/themeSlice";
import linksReducer from "./slice/linksSlice";
import modalReducer from "./slice/modalSlice";
import projectArrayReducer from "./slice/projectArraySlice";
import headingReducer from "./slice/headingSlice";

const store = configureStore({
    reducer: {
    theme: themeReducer,
    links: linksReducer,
    modal: modalReducer,
    projectArray: projectArrayReducer,
    heading: headingReducer
}})

export default store