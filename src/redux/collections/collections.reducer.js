import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  collectionEntities: [],
  currentCollection: "",
  biggestCollectionEntities: [],
  collectionsLoading: true,
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState: initialState,
  reducers: {
    createCollection: () => {},
    getCollections: () => {},
    getCollectionsSuccess: (state, action) => {
      state.collectionsLoading = false;
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
    getBiggestCollections: () => {},
    getBiggestCollectionsSuccess: (state, action) => {
      state.biggestCollectionEntities = action.payload;
    },
    getBiggestCollectionsFail: (_, action) => {
      message.error(action.payload);
    },
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
  getBiggestCollections,
  getBiggestCollectionsSuccess,
  getBiggestCollectionsFail,
} = collectionsSlice.actions;

export default collectionsReducer;
