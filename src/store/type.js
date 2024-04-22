import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'total',
};

const reducers = {
  // setTypes: (state, action) => (state.type = action.payload),
  setTypes: (state, { payload: type }) => (state.type = type),
};

const itemsSlice = createSlice({
  name: 'types',
  initialState,
  reducers,
});

export const { setTypes } = itemsSlice.actions;
export default itemsSlice.reducer;
