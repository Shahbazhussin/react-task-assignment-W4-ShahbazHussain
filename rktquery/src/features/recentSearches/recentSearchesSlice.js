import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searches: [],
};

const recentSearchesSlice = createSlice({
  name: "recentSearches",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      const newSearch = action.payload;
      state.searches = [
        newSearch,
        ...state.searches.filter((search) => search !== newSearch),
      ].slice(0, 5);
    },
    clearSearches: (state) => {
      state.searches = [];
    },
  },
});

export const { addSearch, clearSearches } = recentSearchesSlice.actions;
export default recentSearchesSlice.reducer;
