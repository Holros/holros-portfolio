import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slice/themeSlice";
import linksReducer from "./slice/linksSlice";
import modalReducer from "./slice/modalSlice";
import isLoggedInReducer from "./slice/isLoggedInSlice";

const store = configureStore({
    reducer: {
    theme: themeReducer,
    links: linksReducer,
    modal: modalReducer,
    isLoggedIn: isLoggedInReducer
}})

export type RootState = ReturnType<typeof store.getState>

export default store