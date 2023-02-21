import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  userEntities: [],
  userLoading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    getUsers: (state) => {
      state.userLoading = false;
    },
    getUsersSuccess: (state, action) => {
      state.userEntities = action.payload;
      state.userLoading = false;
    },
    getUsersFail: (state, action) => {
      state.userLoading = false;
      message.error(action.payload);
    },
    updateUsers: () => {},
    deleteUsers: () => {},
  },
});

const adminReducer = adminSlice.reducer;
export const { getUsers, getUsersSuccess, getUsersFail, updateUsers, deleteUsers } =
  adminSlice.actions;

export default adminReducer;
