import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.accessToken;

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    addJobData: builder.mutation({
      query: (jobForm) => ({
        url: "/details/",
        method: "POST",
        body: jobForm,
      }),
    }),
    getJobByUserId: builder.query({
      query: (userId) => ({
        url: `/details/jobs/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useAddJobDataMutation,
  useGetJobByUserIdQuery,
} = authApi;
