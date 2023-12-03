import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentYear: ""
};

const reducers = {
  setCurrentYear(state, { payload: currentYear }) {
    state.currentYear = currentYear;
  },
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers
});

export const { setCurrentYear } = chartSlice.actions;

export default chartSlice.reducer;