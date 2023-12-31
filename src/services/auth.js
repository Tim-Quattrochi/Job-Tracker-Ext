import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.user?.accessToken; //it's auth.user in the redux store.

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/user/register",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useLogoutMutation,
  useRegisterMutation,
} = authApi;
