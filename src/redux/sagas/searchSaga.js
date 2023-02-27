import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import config from "../../config.json";
import { search, searchFail, searchSuccess } from "../search/search.reducer";

function* workSearch({ payload }) {
  try {
    const response = yield axios.get(config.baseUrl + `/api/search`, {
      params: { term: payload },
    });
    const countedCols = response?.data?.collections?.map((col) => ({
      ...col,
      itemNumb: response?.data?.countCols?.find((item) => item._id === col._id)?.count ?? 0,
    }));
    yield put(searchSuccess({ collections: countedCols, items: response?.data.items }));
  } catch (error) {
    yield put(searchFail(error?.response?.data?.message));
    console.log(error);
  }
}

function* searchSaga() {
  yield takeLatest(search.type, workSearch);
}

export default searchSaga;
