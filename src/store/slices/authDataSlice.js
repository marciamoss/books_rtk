import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../apis/userApi';

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
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.addUser.matchRejected,
      (state, { payload, meta }) => {
          return{...state, signedIn: false, authUserId: null, userName: null, showError: true, errorMessage: 'You can still search for books'};
      }
    );
    builder.addMatcher(
      userApi.endpoints.fetchUser.matchRejected,
      (state, { payload, meta }) => {
        if(meta.arg.originalArgs) {
          return{...state, signedIn: false, authUserId: null, userName: null, showError: true, errorMessage: 'You can still search for books'};
        }
      }
    );
  },
});

export const { authDataInfo } = authDataSlice.actions;
export const authDataReducer = authDataSlice.reducer;

