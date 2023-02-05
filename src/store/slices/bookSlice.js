import { createSlice } from '@reduxjs/toolkit';
import { booksApi } from '../apis/booksApi';

const initialState = {
  bookTitle: '',
  author: '',
  showList: false,
  listFetching: false,
  sliderOpen: false,
  savedBooks: [],
  savedId:'',
  failedActionId: ''
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookSliceData(state, action) {
      return { ...state, ...action.payload};
    },
    resetAlertPopup(state, action) {
      if(action.payload.failedActionId) {
        state.failedActionId='';
      }else if(action.payload.savedId) {
        state.savedId='';
      }
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
    builder.addMatcher(
      booksApi.endpoints.saveUserBook.matchPending,
      (state, { payload }) => {
        state.savedId="";
        state.failedActionId='';
      }
    );
    builder.addMatcher(
      booksApi.endpoints.saveUserBook.matchFulfilled,
      (state, { payload }) => {
        state.savedId = payload.id;
        state.failedActionId='';
      }
    );
    builder.addMatcher(
      booksApi.endpoints.saveUserBook.matchRejected,
      (state, { payload, meta, error }) => {
        state.failedActionId = meta.arg.originalArgs.id;
        state.savedId="";
      }
    );
    builder.addMatcher(
      booksApi.endpoints.fetchUserBooks.matchFulfilled,
      (state, { payload }) => {
        state.savedBooks = payload;
      }
    );
  },
});

export const { setBookSliceData, resetAlertPopup } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;

