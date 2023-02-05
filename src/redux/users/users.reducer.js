import { createSlice } from "@reduxjs/toolkit";
import config from "../../config.json";

const initialState = {
  isDarkTheme: false,
  UILanguage: config.UILanguage.eng,
  defaultLang: "eng",
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    changeLanguage: (state, action) => {
      state.UILanguage = action.payload;
    },
    setDefaultLang: (state, action) => {
      state.defaultLang = action.payload;
    },
  },
});

const usersReducer = usersSlice.reducer;
export const { toggleTheme, changeLanguage, setDefaultLang } = usersSlice.actions;

export default usersReducer;
