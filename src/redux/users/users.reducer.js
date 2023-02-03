import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkTheme: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

const usersReducer = usersSlice.reducer;
export const { toggleTheme } = usersSlice.actions;

export default usersReducer;
