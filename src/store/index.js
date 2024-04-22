import { configureStore } from '@reduxjs/toolkit';
import formReducer from './form.js';
import chartReducer from './chart.js';
import typeReducer from './type.js';

export const store = configureStore({
  reducer: {
    form: formReducer,
    chart: chartReducer,
    type: typeReducer,
  },
});
