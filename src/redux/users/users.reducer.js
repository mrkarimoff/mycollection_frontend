import { createSlice } from "@reduxjs/toolkit";
import config from "../../config.json";
import {
  getLocalTheme,
  setLocalTheme,
  getLocalLanguage,
  setLocalLanguage,
  setLocalToken,
  setLocalUsername,
  setLocalRole,
} from "../../utils/localStorage.service";
import { message } from "antd";

const initialState = {
  isDarkTheme: getLocalTheme() || false,
  UILanguage: config.UILanguage[getLocalLanguage()] || config.UILanguage.eng,
  defaultLang: getLocalLanguage() || "eng",
  registerLoading: false,
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
    onRegisterStart: (state) => {
      state.registerLoading = true;
    },
    onRegisterSuccess: (state, action) => {
      message.success(action.payload);
      state.registerLoading = false;
    },
    onRegisterFail: (state, action) => {
      message.error(action.payload);
      state.registerLoading = false;
    },
    onLoginStart: () => {},
    onLoginSuccess: (state, { payload }) => {
      setLocalToken(payload.data);
      setLocalRole(payload.role);
      message.success(state.UILanguage.authMessages.loggedIn);
      setLocalUsername(payload.username);
    },
    onLoginFail: (_, { payload }) => {
      message.error(payload);
    },
  },
});

const usersReducer = usersSlice.reducer;
export const {
  toggleTheme,
  changeLanguage,
  setDefaultLang,
  onRegisterStart,
  onRegisterSuccess,
  onRegisterFail,
  onLoginStart,
  onLoginSuccess,
  onLoginFail,
} = usersSlice.actions;

export default usersReducer;
