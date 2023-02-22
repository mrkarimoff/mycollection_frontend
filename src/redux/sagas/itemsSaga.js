import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import {
  getCustomFieldsSuccess,
  getCustomFieldsFail,
  getCollectionCustomFields,
} from "../items/items.reducer";
import config from "../../config.json";
import { getLocalToken } from "../../utils/localStorage.service";

function* workGetCustomFields({ payload }) {
  try {
    const response = yield axios.get(config.baseUrl + `/api/collections/${payload}/custom-fields`, {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    console.log(response);
    yield put(getCustomFieldsSuccess(response?.data?.customFields));
  } catch (error) {
    yield put(getCustomFieldsFail(error?.response?.data?.message));
  }
}

function* itemsSaga() {
  yield takeLatest(getCollectionCustomFields.type, workGetCustomFields);
}

export default itemsSaga;
