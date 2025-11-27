import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slice/themeSlice";
import linksReducer from "./slice/linksSlice";
import modalReducer from "./slice/modalSlice";
import headingReducer from "./slice/headingSlice";

const store = configureStore({
    reducer: {
    theme: themeReducer,
    links: linksReducer,
    modal: modalReducer,
    heading: headingReducer
}})

export type RootState = ReturnType<typeof store.getState>

export default store