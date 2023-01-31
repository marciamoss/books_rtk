import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      addUser: builder.mutation({
        query: (user) => {
          return {
            url: '/api/user/add',
            method: 'POST',
            body: {
              userId: user
            },
          };
        },
      }),
      fetchUser: builder.query({
        query: (authUserId) => {
            return {
              url: `/api/user/${authUserId}`,
              method: 'GET',
            };
        },
      }),
    };
  },
});

export const {
  useFetchUserQuery,
  useAddUserMutation,
} = userApi;
export { userApi };
