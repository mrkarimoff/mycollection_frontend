const IS_DARK_THEME = "isDarkTheme";
const LANGUAGE = "language";

export const getLocalTheme = () => JSON.parse(localStorage.getItem(IS_DARK_THEME));
export const setLocalTheme = (isDark) =>
  JSON.stringify(localStorage.setItem(IS_DARK_THEME, isDark));

export const getLocalLanguage = () => localStorage.getItem(LANGUAGE);
export const setLocalLanguage = (lang) => localStorage.setItem(LANGUAGE, lang);
