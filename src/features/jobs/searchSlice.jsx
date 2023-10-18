import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchWord: "",
    selectedStatus: "",
    results: [],
  },
  reducers: {
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setSearchWord: (state, action) => {
      state.searchWord = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { setSearchWord, setResults, setSelectedStatus } =
  searchSlice.actions;
export default searchSlice.reducer;
