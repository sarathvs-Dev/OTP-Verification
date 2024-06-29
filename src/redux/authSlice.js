import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    confirmationResult: null,
  },
  reducers: {
    setConfirmationResult: (state, action) => {
      state.confirmationResult = action.payload;
    },
  },
});

export const { setConfirmationResult } = authSlice.actions;
export default authSlice.reducer;
