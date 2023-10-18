import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import { jobApi } from "../features/jobs/jobSlice";
import searchSlice from "../features/jobs/searchSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    auth: authReducer,
    search: searchSlice,
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
