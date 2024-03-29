import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  authDataReducer,
  authDataInfo,
  validRoute,
} from "./slices/authDataSlice";
import {
  bookReducer,
  setBookSliceData,
  resetAlertPopup,
} from "./slices/bookSlice";

import { authApi } from "./apis/authApi";
import { booksApi } from "./apis/booksApi";

export const store = configureStore({
  reducer: {
    authData: authDataReducer,
    book: bookReducer,
    [authApi.reducerPath]: authApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(booksApi.middleware);
  },
});
setupListeners(store.dispatch);

export { authDataInfo, validRoute, setBookSliceData, resetAlertPopup };

export { useLogInMutation, useLogOutMutation } from "./apis/authApi";
export {
  useSearchBooksQuery,
  useFetchUserBooksQuery,
  useSaveUserBookMutation,
  useDeleteUserBookMutation,
} from "./apis/booksApi";
