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
    removeJob: (state, action) => {
      state.data = state.data.filter(
        (job) => job.id !== action.payload.id
      );
    },
    updateJob: (state, action) => {
      const { id } = action.payload;

      const index = state.data.findIndex((job) => job.id === id);
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      }
    },
    isInEdit: (state, action) => {
      const { id, inEdit } = action.payload;
      const index = state.data.findIndex((job) => job.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], inEdit };
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

export const selectJobInEdit = (state) => {
  if (state.jobs.data === undefined) return null;
  return state.jobs.data.find((job) => job.inEdit === true);
};

export const {
  setJobs,
  addJob,
  removeJob,
  updateJob,
  setError,
  resetError,
  isInEdit,
} = jobsSlice.actions;

export default jobsSlice.reducer;
