import { createSlice } from "@reduxjs/toolkit";

export const recentSearchesSlice = createSlice({
  name: "recentSearches",
  initialState: {
    searches: [],
  },
  reducers: {
    addSearch: (state, action) => {
      state.searches = [action.payload, ...state.searches.slice(0, 4)]; // Keep only the last 5 searches
    },
    setSearches: (state, action) => {
      state.searches = action.payload; // Load searches from localStorage
    },
  },
});

export const { addSearch, setSearches } = recentSearchesSlice.actions;
export default recentSearchesSlice.reducer;
