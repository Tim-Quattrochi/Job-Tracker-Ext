import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    addJob: (state, action) => {
      state.data.push(action.payload);
    },
    deleteJob: (state, action) => {
      state.data = state.data.filter(
        (job) => job.id !== action.payload
      );
    },
    updateJob: (state, action) => {
      const { id, updatedJob } = action.payload;
      const index = state.data.findIndex((job) => job.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedJob };
      }
    },
    setError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    resetError: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  setJobs,
  addJob,
  deleteJob,
  updateJob,
  setError,
  resetError,
} = jobsSlice.actions;

export default jobsSlice.reducer;
