const IS_DARK_THEME = "isDarkTheme";
const LANGUAGE = "language";
const ACCESS_TOKEN = "access_token";
const USERNAME = "username";
const ROLE = "role";

export const getLocalTheme = () => JSON.parse(localStorage.getItem(IS_DARK_THEME));
export const setLocalTheme = (isDark) =>
  JSON.stringify(localStorage.setItem(IS_DARK_THEME, isDark));

export const getLocalLanguage = () => localStorage.getItem(LANGUAGE);
export const setLocalLanguage = (lang) => localStorage.setItem(LANGUAGE, lang);

export const getLocalToken = () => localStorage.getItem(ACCESS_TOKEN);
export const setLocalToken = (token) => localStorage.setItem(ACCESS_TOKEN, token);

export const getLocalUsername = () => localStorage.getItem(USERNAME);
export const setLocalUsername = (name) => localStorage.setItem(USERNAME, name);

export const getLocalRole = () => localStorage.getItem(ROLE);
export const setLocalRole = (role) => localStorage.setItem(ROLE, role);

export const removeAuthDetails = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(USERNAME);
  localStorage.removeItem(ROLE);
};
