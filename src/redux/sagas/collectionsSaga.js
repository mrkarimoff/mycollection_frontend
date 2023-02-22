import axios from "axios";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { put, takeLatest } from "redux-saga/effects";
import config from "../../config.json";
import { storage } from "../../firebase.config";
import { getLocalToken } from "../../utils/localStorage.service";
import {
  createCollection,
  deleteCollection,
  getCollections,
  getCollectionsFail,
  getCollectionsSuccess,
  updateCollection,
} from "../collections/collections.reducer";

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
  const imgName = payload?.collectionImg?.name + "  " + Date.now();
  if (payload?.collectionImg) {
    const imagesRef = ref(storage, `collectionImages/${imgName}`);
    yield uploadBytes(imagesRef, payload?.collectionImg);
    imgUrl = yield getDownloadURL(imagesRef);
  }
  console.log({ ...payload, collectionImg: { imgUrl, imgName } });

  try {
    yield axios.post(
      config.baseUrl + "/api/collections",
      { ...payload, collectionImg: { imgUrl, imgName } },
      {
        headers: { Authorization: `Bearer ${getLocalToken()}` },
      }
    );
    yield put(getCollections(payload.urlParams));
  } catch (error) {
    console.log(error);
  }
}

function* workDeleteCollection({ payload }) {
  if (payload.imgData?.imgUrl) {
    const imgRef = ref(storage, `collectionImages/${payload.imgData?.imgName}`);
    yield deleteObject(imgRef);
  }

  try {
    yield axios.delete(config.baseUrl + `/api/collections/${payload?.colId}`, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield put(getCollections(payload.urlParams));
  } catch (error) {
    console.log(error);
  }
}

function* workUpdateCollection({ payload }) {
  let imgUrl = payload?.collectionImg?.imgUrl;
  if (payload?.collectionImg?.name) {
    const imagesRef = ref(storage, `collectionImages/${payload?.currentCollection?.imgName}`);
    yield uploadBytes(imagesRef, payload?.collectionImg);
    imgUrl = yield getDownloadURL(imagesRef);
  }
  const imgName = payload?.currentCollection?.imgName;
  const colId = payload?.currentCollection?.id;
  delete payload.currentCollection;
  const updatedData = { ...payload, collectionImg: { imgUrl, imgName } };
  console.log(updatedData);

  try {
    yield axios.put(config.baseUrl + `/api/collections/${colId}`, updatedData, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield put(getCollections(payload.urlParams));
  } catch (error) {
    console.log(error);
  }
}

function* collectionsSaga() {
  yield takeLatest(createCollection.type, workCreateCollection);
  yield takeLatest(getCollections.type, workGetCollection);
  yield takeLatest(deleteCollection.type, workDeleteCollection);
  yield takeLatest(updateCollection.type, workUpdateCollection);
}

export default collectionsSaga;
