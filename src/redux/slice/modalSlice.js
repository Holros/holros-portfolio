import { createSlice } from "@reduxjs/toolkit";

const modalOptions = {
  name: "modal",
  initialState: {
    value: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.value = true;
    },
    closeModal: (state, action) => {
      state.value = false;
    },
  },
};

const modalSlice = createSlice(modalOptions);

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
