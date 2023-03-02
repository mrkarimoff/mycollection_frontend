import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import config from "../../config.json";
import { getLocalToken } from "../../utils/localStorage.service";
import {
  createItem,
  deleteItem,
  getAllTags,
  getAllTagsFail,
  getAllTagsSuccess,
  getCollectionData,
  getCollectionDataFail,
  getCollectionDataSuccess,
  getComments,
  getCommentsFail,
  getCommentsSuccess,
  getItems,
  getItemsFail,
  getItemsSuccess,
  getRecentItems,
  getRecentItemsFail,
  getRecentItemsSuccess,
  getSingleItem,
  getSingleItemFail,
  getSingleItemSuccess,
  sendComment,
  updateItem,
  updateLikes,
  updateLikesFail,
  updateLikesSuccess,
} from "../items/items.reducer";

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
    const response = yield axios.get(config.baseUrl + `/api/tags`);
    yield put(getAllTagsSuccess(response?.data));
  } catch (error) {
    yield put(getAllTagsFail(error?.response?.data?.message));
  }
}

function* workGetItems({ payload }) {
  try {
    const response = yield axios.get(config.baseUrl + `/api/collections/${payload}/items`);
    yield put(getItemsSuccess(response?.data));
  } catch (error) {
    yield put(getItemsFail(error?.response?.data?.message));
  }
}

function* workGetRecentItems() {
  try {
    const response = yield axios.get(config.baseUrl + `/api/items/recent`, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield put(getRecentItemsSuccess(response?.data));
  } catch (error) {
    yield put(getRecentItemsFail(error?.response?.data?.message));
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

function* workGetSingleItem({ payload }) {
  try {
    const response = yield axios.get(config.baseUrl + `/api/items/${payload}`);
    yield put(getSingleItemSuccess(response?.data));
  } catch (error) {
    yield put(getSingleItemFail(error?.response?.data?.message));
  }
}

function* workUpdateLikes({ payload }) {
  try {
    const response = yield axios.put(config.baseUrl + `/api/items/likes/${payload}`, null, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield put(updateLikesSuccess(response?.data));
  } catch (error) {
    yield put(updateLikesFail(error?.response?.data?.message));
  }
}

function* workSendComment({ payload }) {
  try {
    yield axios.post(
      config.baseUrl + `/api/items/comment/${payload.itemId}`,
      { comment: payload.text },
      {
        headers: { Authorization: `Bearer ${getLocalToken()}` },
      }
    );
    yield put(getComments(payload.itemId));
  } catch (error) {
    console.log(error);
  }
}

function* workGetComments({ payload }) {
  try {
    const response = yield axios.get(config.baseUrl + `/api/items/${payload}/comments`, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield put(getCommentsSuccess(response?.data));
  } catch (error) {
    yield put(getCommentsFail(error?.response?.data?.message));
  }
}

function* itemsSaga() {
  yield takeLatest(getCollectionData.type, workGetCollectionData);
  yield takeLatest(createItem.type, workCreateItem);
  yield takeLatest(getAllTags.type, workGetAllTags);
  yield takeLatest(getItems.type, workGetItems);
  yield takeLatest(getRecentItems.type, workGetRecentItems);
  yield takeLatest(deleteItem.type, workDeleteItem);
  yield takeLatest(updateItem.type, workUpdateItem);
  yield takeLatest(getSingleItem.type, workGetSingleItem);
  yield takeLatest(updateLikes.type, workUpdateLikes);
  yield takeLatest(sendComment.type, workSendComment);
  yield takeLatest(getComments.type, workGetComments);
}

export default itemsSaga;
