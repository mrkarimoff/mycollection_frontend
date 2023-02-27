import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  searchValue: "",
  searchResult: "",
  resultsLoading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    updateSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    search: (state) => {
      state.resultsLoading = true;
    },
    searchSuccess: (state, action) => {
      state.searchResult = action.payload;
      state.resultsLoading = false;
    },
    searchFail: (state, action) => {
      message.error(action.payload);
      state.resultsLoading = false;
    },
  },
});

const searchReducer = searchSlice.reducer;
export const { updateSearchValue, search, searchSuccess, searchFail } = searchSlice.actions;

export default searchReducer;
