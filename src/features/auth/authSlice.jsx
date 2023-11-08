import { createSlice } from "@reduxjs/toolkit";
import { APP_NAME } from "../../config/constants";

const initialState = {
  user: localStorage.getItem(APP_NAME)
    ? JSON.parse(localStorage.getItem(APP_NAME))
    : null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload;
    },
    //looking at setCredentials, I don't believe I need to also setUser, they both do the same thing.
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem(APP_NAME);
    },
  },
});

export const { setCredentials, setUser, clearUser } = slice.actions;

export const selectCurrentUser = (state) => state.auth.user;

export default slice.reducer;
