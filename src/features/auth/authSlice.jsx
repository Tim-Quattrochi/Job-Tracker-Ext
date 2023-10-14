import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, setUser } = slice.actions;

export const selectCurrentUser = (state) => state.auth.user;

export default slice.reducer;
