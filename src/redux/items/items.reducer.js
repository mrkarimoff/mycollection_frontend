import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  itemEntities: [],
  customFields: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState: initialState,
  reducers: {
    getCollectionCustomFields: () => {},
    getCustomFieldsSuccess: (state, action) => {
      state.customFields = action.payload;
    },
    getCustomFieldsFail: (_, action) => {
      message.error(action.payload);
    },
  },
});

const itemsReducer = itemsSlice.reducer;
export const { getCollectionCustomFields, getCustomFieldsSuccess, getCustomFieldsFail } =
  itemsSlice.actions;

export default itemsReducer;
