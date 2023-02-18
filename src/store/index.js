import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authDataReducer, authDataInfo } from "./slices/authDataSlice";
import {
  bookReducer,
  setBookSliceData,
  resetAlertPopup,
} from "./slices/bookSlice";
import { userDataReducer } from "./slices/userDataSlice";

import { authApi } from "./apis/authApi";
import { booksApi } from "./apis/booksApi";
import { userApi } from "./apis/userApi";

export const store = configureStore({
  reducer: {
    authData: authDataReducer,
    book: bookReducer,
    userData: userDataReducer,
    [authApi.reducerPath]: authApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(booksApi.middleware)
      .concat(userApi.middleware);
  },
});
setupListeners(store.dispatch);

export { authDataInfo, setBookSliceData, resetAlertPopup };

export { useLogInMutation, useLogOutMutation } from "./apis/authApi";
export {
  useSearchBooksQuery,
  useFetchUserBooksQuery,
  useSaveUserBookMutation,
  useDeleteUserBookMutation,
} from "./apis/booksApi";
export { useFetchUserQuery, useAddUserMutation } from "./apis/userApi";
