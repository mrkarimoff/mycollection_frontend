import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  collectionEntities: [],
  currentCollection: "",
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState: initialState,
  reducers: {
    createCollection: () => {},
    getCollections: () => {},
    getCollectionsSuccess: (state, action) => {
      state.collectionEntities = action.payload;
    },
    getCollectionsFail: (_, { payload }) => {
      message.error(payload);
    },
    deleteCollection: () => {},
    changeCurrentCollection: (state, action) => {
      state.currentCollection = action.payload;
    },
    updateCollection: () => {},
  },
});

const collectionsReducer = collectionsSlice.reducer;
export const {
  createCollection,
  getCollections,
  getCollectionsSuccess,
  getCollectionsFail,
  deleteCollection,
  changeCurrentCollection,
  updateCollection,
} = collectionsSlice.actions;

export default collectionsReducer;
