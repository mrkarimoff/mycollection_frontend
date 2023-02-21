import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import config from "../../config.json";
import { getLocalToken } from "../../utils/localStorage.service";
import {
  createCollection,
  getCollections,
  getCollectionsSuccess,
  getCollectionsFail,
} from "../collections/collections.reducer";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.config";

function* workGetCollection({ payload }) {
  try {
    const response = yield axios.get(config.baseUrl + `/api/collections/${payload}`, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield put(getCollectionsSuccess(response.data));
  } catch (error) {
    yield put(getCollectionsFail(error?.response?.data?.message));
  }
}

function* workCreateCollection({ payload }) {
  let imgUrl = "";
  if (payload?.collectionImg) {
    const imagesRef = ref(
      storage,
      `collectionImages/${payload?.collectionImg?.name + "  " + Date.now()}`
    );
    yield uploadBytes(imagesRef, payload?.collectionImg);
    imgUrl = yield getDownloadURL(imagesRef);
  }
  console.log({ ...payload, collectionImg: imgUrl });

  try {
    yield axios.post(
      config.baseUrl + "/api/collections",
      { ...payload, collectionImg: imgUrl },
      {
        headers: { Authorization: `Bearer ${getLocalToken()}` },
      }
    );
    yield put(getCollections(payload.urlParams));
  } catch (error) {
    console.log(error);
  }
}

function* collectionsSaga() {
  yield takeLatest(createCollection.type, workCreateCollection);
  yield takeLatest(getCollections.type, workGetCollection);
}

export default collectionsSaga;
