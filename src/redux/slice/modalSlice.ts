import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  value: boolean
}

const initialState = {
  value: false,
}

const modalOptions = {
  name: "modal",
  initialState ,
  reducers: {
    openModal: (state : InitialState) => {
      state.value = true;
    },
    closeModal: (state: InitialState) => {
      state.value = false;
    },
  },
};

const modalSlice = createSlice(modalOptions);

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
