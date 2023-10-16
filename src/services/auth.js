import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../features/auth/authSlice";

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
        localStorage.getItem("user")
      );

      const updatedUser = {
        ...existingUserData,
        accessToken: refreshResult.data.accessToken,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
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
        url: `/details/${jobForm.userId}`,
        credentials: "include",
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
