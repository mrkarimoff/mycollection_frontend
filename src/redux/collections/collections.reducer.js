import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  collectionEntities: [],
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
  },
});

const collectionsReducer = collectionsSlice.reducer;
export const { createCollection, getCollections, getCollectionsSuccess, getCollectionsFail } =
  collectionsSlice.actions;

export default collectionsReducer;
