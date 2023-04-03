import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signedIn: false,
  authUserId: null,
  email: null,
  userName: null,
  showError: false,
  errorMessage: null,
  token: null,
  validRoute: false,
  showAutoLogout: false,
  showAutoLogin: false,
};
const authDataSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    authDataInfo(state, action) {
      return { ...state, ...action.payload };
    },
    validRoute(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { authDataInfo, validRoute } = authDataSlice.actions;
export const authDataReducer = authDataSlice.reducer;
