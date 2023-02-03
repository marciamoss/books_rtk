import { createSlice } from '@reduxjs/toolkit';
import { booksApi } from '../apis/booksApi';

const initialState = {
  bookTitle: '',
  author: '',
  showList: false,
  listFetching: false,
  sliderOpen: false
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookSliceData(state, action) {
      return { ...state, ...action.payload};
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      booksApi.endpoints.searchBooks.matchPending,
      (state, { payload }) => {
        state.listFetching = true;
      }
    );
    builder.addMatcher(
      booksApi.endpoints.searchBooks.matchFulfilled,
      (state, { payload }) => {
        state.listFetching = false;
      }
    );
    builder.addMatcher(
      booksApi.endpoints.searchBooks.matchRejected,
      (state, { payload }) => {
        state.listFetching = false;
      }
    );
  },
});

export const { setBookSliceData } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;

