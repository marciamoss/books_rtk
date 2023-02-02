import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signedIn: false,
  authUserId: null,
  userName: null,
  showError: false,
  errorMessage: null
};
const authDataSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    authDataInfo(state, action) {
      return { ...state, ...action.payload};
    }
  }
});

export const { authDataInfo } = authDataSlice.actions;
export const authDataReducer = authDataSlice.reducer;

