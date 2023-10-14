import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
