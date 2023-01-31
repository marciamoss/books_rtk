import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const keys = require("../../keys.js");

const booksApi = createApi({
    reducerPath: 'books',
    baseQuery: fetchBaseQuery({
      baseUrl: keys.book.url,
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
                    url: `${bookNAuthor}&key=${keys.book.apiKey}&startIndex=0&maxResults=40`,
                    method: 'GET',
                  };
                },
            }),
        };
    },
});

export const {
  useSearchBooksQuery,
} = booksApi;
export { booksApi };