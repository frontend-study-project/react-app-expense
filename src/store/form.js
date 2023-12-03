import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFormAdd: false,
  isFormEdit: false,
};

const reducers = {
  setIsFormAdd(state, { payload: isFormAdd }) {
    state.isFormAdd = isFormAdd;
  },

  setIsFormEdit(state, { payload: isFormEdit }) {
    state.isFormEdit = isFormEdit;
  },
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers
});

export const { setIsFormAdd, setIsFormEdit } = formSlice.actions;

export default formSlice.reducer;