const getTheme = () => (state) => state.users.isDarkTheme;
const getLanguage = () => (state) => state.users.UILanguage;
const getDefaultLang = () => (state) => state.users.defaultLang;
const getRegisterLoading = () => (state) => state.users.registerLoading;

export { getTheme, getLanguage, getDefaultLang, getRegisterLoading };
