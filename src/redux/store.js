import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // We'll create this next

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});