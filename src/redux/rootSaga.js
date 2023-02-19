import { all } from "redux-saga/effects";
import usersSaga from "./sagas/usersSaga";
import adminSaga from "./sagas/adminSaga";

export default function* rootSaga() {
  yield all([usersSaga(), adminSaga()]);
}
