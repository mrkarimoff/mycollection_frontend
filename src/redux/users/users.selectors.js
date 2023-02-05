const getTheme = () => (state) => state.users.isDarkTheme;
const getLanguage = () => (state) => state.users.UILanguage;
const getDefaultLang = () => (state) => state.users.defaultLang;

export { getTheme, getLanguage, getDefaultLang };
