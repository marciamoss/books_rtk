import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookTitle: '',
  author: '',
  showList: false,
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookTitle(state, action) {
      return { ...state, ...action.payload};
    }
  }
});

export const { setBookTitle } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;

