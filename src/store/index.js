import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authDataReducer, authDataInfo } from './slices/authDataSlice';
import { authApi } from './apis/authApi';
import { booksApi } from './apis/booksApi';

export const store = configureStore({
  reducer: {
    authData: authDataReducer,
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

export { authDataInfo };

export {
    useAuthChangeMutation,
} from './apis/authApi';
export {
  useSearchBooksMutation,
} from './apis/booksApi';
