import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  userEntities: [],
  userLoading: true,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    getUsers: (state) => {
      state.userLoading = true;
    },
    getUsersSuccess: (state, action) => {
      state.userEntities = action.payload;
      state.userLoading = false;
    },
    getUsersFail: (state, action) => {
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
