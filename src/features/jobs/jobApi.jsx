import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../auth/authSlice";
import { APP_NAME } from "../../config/constants";

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

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token to server");
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      "user/auth/refresh",
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const existingUserData = JSON.parse(
        localStorage.getItem(APP_NAME)
      );

      const updatedUser = {
        ...existingUserData,
        accessToken: refreshResult.data.accessToken,
      };

      localStorage.setItem(APP_NAME, JSON.stringify(updatedUser));

      //replace the accessToken in state with the new one.
      api.dispatch(setCredentials(updatedUser));

      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logOut());
      console.log("logout");
    }
  }

  return result;
};

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addJobData: builder.mutation({
      query: (jobForm) => ({
        url: `/details/${jobForm.userId}`,
        credentials: "include",
        method: "POST",
        body: jobForm,
      }),
      invalidatesTags: ["Job"], //when this mutation is called, it will invalidate the Job tag, so that the next time the getJobByUserId query is called, it will refetch the data from the server.
    }),
    getJobByUserId: builder.query({
      query: (userId) => ({
        url: `/details/jobs/${userId}`,
        method: "GET",
      }),
      transformResponse: (res) => res.sort((a, b) => b.id - a.id), //sort response by id.
      providesTags: ["Job"],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/details/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
    editJob: builder.mutation({
      query: (jobForm) => ({
        url: `/details/${jobForm.id}`,
        method: "PUT",
        body: jobForm,
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useAddJobDataMutation,
  useGetJobByUserIdQuery,
  useDeleteJobMutation,
  useEditJobMutation,
} = jobApi;
