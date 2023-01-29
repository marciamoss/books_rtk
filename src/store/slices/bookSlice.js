import { createSlice } from '@reduxjs/toolkit';
import { booksApi } from '../apis/booksApi';

const initialState = {
  bookTitle: '',
  author: '',
  searchResults: []
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookTitle(state, action) {
      return { ...state, ...action.payload};
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      booksApi.endpoints.searchBooks.matchFulfilled,
      (state, { payload }) => {
        state.searchResults = payload.items;
      }
    )
  },

});

export const { setBookTitle } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;

