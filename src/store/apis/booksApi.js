import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const keys = require("../../keys.js");

const booksApi = createApi({
    reducerPath: 'books',
    baseQuery: fetchBaseQuery({
      baseUrl: keys.mongo.api,
      fetchFn: async (...args) => {
        return fetch(...args);
      },
    }),
    endpoints(builder) {
        return {
          searchBooks: builder.query({
                query: ({bookTitle, author}) => {
                  const bookNAuthor= author ? (bookTitle).split(" ").join("+")+(author).split(" ").join("+") : bookTitle;
                  return {
                    url: `${keys.book.url}${bookNAuthor}&key=${keys.book.apiKey}&startIndex=0&maxResults=40`,
                    method: 'GET',
                  };
                },
          }),
          saveUserBook: builder.mutation({
            invalidatesTags: (result, error, book) => {
              return [{ type: 'UsersBooks', id: book.userId }];
            },
            query: (book) => {
              return {
                url: '/api/books/save',
                method: 'POST',
                body: {
                  book
                },
              };
            },
          }),
          fetchBooks: builder.query({
            providesTags: (result, error, user) => {
              let tags;
              if(result) {
                tags = result?.map((book) => {
                  return { type: 'Book', id: book.id };
                });
                tags.push({ type: 'UsersBooks', id: user });
              }else {
                tags=[];
              }
              return tags;
            },
            query: (user) => {
              return {
                url: `/api/books/${user}`,
                method: 'GET',
              };
            },
          }),
        };
    },
});

export const {
  useSearchBooksQuery,
  useFetchBooksQuery,
  useSaveUserBookMutation,
} = booksApi;
export { booksApi };