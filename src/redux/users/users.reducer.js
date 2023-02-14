import { createSlice } from "@reduxjs/toolkit";
import config from "../../config.json";
import {
  getLocalTheme,
  setLocalTheme,
  getLocalLanguage,
  setLocalLanguage,
} from "../../utils/localStorage.service";

const initialState = {
  isDarkTheme: getLocalTheme() || false,
  UILanguage: config.UILanguage[getLocalLanguage()] || config.UILanguage.eng,
  defaultLang: getLocalLanguage() || "eng",
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
      setLocalTheme(state.isDarkTheme);
    },
    changeLanguage: (state, action) => {
      state.UILanguage = action.payload;
    },
    setDefaultLang: (state, action) => {
      state.defaultLang = action.payload;
      setLocalLanguage(action.payload);
    },
  },
});

const usersReducer = usersSlice.reducer;
export const { toggleTheme, changeLanguage, setDefaultLang } = usersSlice.actions;

export default usersReducer;
