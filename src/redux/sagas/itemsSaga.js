import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createItem,
  getAllTags,
  getAllTagsFail,
  getAllTagsSuccess,
  getCollectionData,
  getCollectionDataSuccess,
  getCollectionDataFail,
  getItems,
  getItemsSuccess,
  getItemsFail,
  deleteItem,
  updateItem,
} from "../items/items.reducer";
import config from "../../config.json";
import { getLocalToken } from "../../utils/localStorage.service";

function* workGetCollectionData({ payload }) {
  try {
    const response = yield axios.get(config.baseUrl + `/api/collections/${payload}/data`, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield put(getCollectionDataSuccess(response?.data));
  } catch (error) {
    yield put(getCollectionDataFail(error?.response?.data?.message));
  }
}

function* workCreateItem({ payload }) {
  try {
    yield axios.post(config.baseUrl + `/api/items`, payload, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield call(workGetAllTags);
    yield put(getItems(payload.collectionId));
  } catch (error) {
    console.log(error);
  }
}

function* workGetAllTags() {
  try {
    const response = yield axios.get(config.baseUrl + `/api/tags`, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield put(getAllTagsSuccess(response?.data));
  } catch (error) {
    yield put(getAllTagsFail(error?.response?.data?.message));
  }
}

function* workGetItems({ payload }) {
  try {
    const response = yield axios.get(config.baseUrl + `/api/collections/${payload}/items`, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield put(getItemsSuccess(response?.data));
  } catch (error) {
    yield put(getItemsFail(error?.response?.data?.message));
  }
}

function* workDeleteItem({ payload }) {
  try {
    yield axios.delete(config.baseUrl + `/api/items/${payload.itemId}`, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield put(getItems(payload.collectionId));
  } catch (error) {
    console.log(error);
  }
}

function* workUpdateItem({ payload }) {
  const { itemId, collectionId } = payload.currentItem;
  delete payload.currentItem;

  try {
    yield axios.put(config.baseUrl + `/api/items/${itemId}`, payload, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield call(workGetAllTags);
    yield put(getItems(collectionId));
  } catch (error) {
    console.log(error);
  }
}

function* itemsSaga() {
  yield takeLatest(getCollectionData.type, workGetCollectionData);
  yield takeLatest(createItem.type, workCreateItem);
  yield takeLatest(getAllTags.type, workGetAllTags);
  yield takeLatest(getItems.type, workGetItems);
  yield takeLatest(deleteItem.type, workDeleteItem);
  yield takeLatest(updateItem.type, workUpdateItem);
}

export default itemsSaga;
