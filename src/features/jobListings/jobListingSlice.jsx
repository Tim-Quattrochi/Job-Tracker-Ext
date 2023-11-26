// src/features/jobListings/apiSlice.js

import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const API_ENDPOINT = "https://remotive.com/api/remote-jobs?limit=5";

export const jobListingApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_ENDPOINT }),
  endpoints: (builder) => ({
    getJobListings: builder.query({
      query: () => "jobs",
    }),
  }),
});

export const { useGetJobListingsQuery } = jobListingApi;
