import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  itemEntities: [],
  customFields: [],
  collectionName: "",
  tags: [],
  currentItem: "",
};

const itemsSlice = createSlice({
  name: "items",
  initialState: initialState,
  reducers: {
    getCollectionData: () => {},
    getCollectionDataSuccess: (state, action) => {
      state.customFields = action.payload.customFields;
      state.collectionName = action.payload.collectionName;
    },
    getCollectionDataFail: (_, action) => {
      message.error(action.payload);
    },
    createItem: () => {},
    getAllTags: () => {},
    getAllTagsSuccess: (state, action) => {
      state.tags = action.payload;
    },
    getAllTagsFail: (_, action) => {
      message.error(action.payload);
    },
    getItems: () => {},
    getItemsSuccess: (state, action) => {
      state.itemEntities = action.payload;
    },
    getItemsFail: (_, action) => {
      message.error(action.payload);
    },
    deleteItem: () => {},
    updateCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    updateItem: () => {},
  },
});

const itemsReducer = itemsSlice.reducer;
export const {
  getCollectionData,
  getCollectionDataSuccess,
  getCollectionDataFail,
  createItem,
  getAllTags,
  getAllTagsSuccess,
  getAllTagsFail,
  getItems,
  getItemsSuccess,
  getItemsFail,
  deleteItem,
  updateCurrentItem,
  updateItem,
} = itemsSlice.actions;

export default itemsReducer;
