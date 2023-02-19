const getUserEntities = () => (state) => state.admin.userEntities;
const getUserLoading = () => (state) => state.admin.userLoading;

export { getUserEntities, getUserLoading };
