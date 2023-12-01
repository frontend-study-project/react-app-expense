import { configureStore } from '@reduxjs/toolkit';
import formReducer from './form.js';

export const store = configureStore({
  reducer: {
    form: formReducer
  },
});