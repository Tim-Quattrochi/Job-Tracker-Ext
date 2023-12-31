import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import { jobApi } from "../features/jobs/jobApi";
import searchReducer from "../features/jobs/searchSlice";
import authReducer from "../features/auth/authSlice";
import jobsReducer from "../features/jobs/jobsSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    auth: authReducer,
    search: searchReducer,
    jobs: jobsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      jobApi.middleware
    ),
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
