import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  itemEntities: [],
  customFields: [],
  collectionName: "",
  tags: [],
  currentItem: "",
  recentItems: [],
  itemsLoading: true,
  canManage: false,
  singleItemLoading: true,
  singleItemEntities: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState: initialState,
  reducers: {
    getCollectionData: () => {},
    getCollectionDataSuccess: (state, action) => {
      state.customFields = action.payload.customFields;
      state.collectionName = action.payload.collectionName;
      state.canManage = action.payload.canManage;
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
      state.itemsLoading = false;
    },
    getItemsFail: (_, action) => {
      message.error(action.payload);
    },
    deleteItem: () => {},
    updateCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    updateItem: () => {},
    getRecentItems: (state) => {
      state.itemsLoading = true;
    },
    getRecentItemsSuccess: (state, action) => {
      state.recentItems = action.payload;
      state.itemsLoading = false;
    },
    getRecentItemsFail: (_, action) => {
      message.error(action.payload);
    },
    getSingleItem: () => {},
    getSingleItemSuccess: (state, action) => {
      state.singleItemLoading = false;
      state.singleItemEntities = action.payload;
    },
    getSingleItemFail: (_, action) => {
      message.error(action.payload);
    },
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
  getRecentItems,
  getRecentItemsSuccess,
  getRecentItemsFail,
  getSingleItem,
  getSingleItemSuccess,
  getSingleItemFail,
} = itemsSlice.actions;

export default itemsReducer;
