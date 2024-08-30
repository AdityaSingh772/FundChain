// store.js
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice'; // Import the reducer

export const store = configureStore({
  reducer: {
    ui: uiReducer, // Add the ui slice reducer
  },
});
