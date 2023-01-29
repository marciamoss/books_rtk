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
            searchBooks: builder.mutation({
                query: ({bookTitle, author}) => {
                  return {
                    url: '/api/books/search',
                    body: {bookTitle, author},
                    method: 'POST',
                  };
                },
            }),
        };
    },
});

export const {
  useSearchBooksMutation,
} = booksApi;
export { booksApi };