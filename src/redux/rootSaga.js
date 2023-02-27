import { all } from "redux-saga/effects";
import usersSaga from "./sagas/usersSaga";
import adminSaga from "./sagas/adminSaga";
import collectionsSaga from "./sagas/collectionsSaga";
import itemsSaga from "./sagas/itemsSaga";
import searchSaga from "./sagas/searchSaga";

export default function* rootSaga() {
  yield all([usersSaga(), adminSaga(), collectionsSaga(), itemsSaga(), searchSaga()]);
}
