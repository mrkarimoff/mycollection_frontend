import { put, takeLatest } from "redux-saga/effects";
import {
  onRegisterSuccess,
  onRegisterStart,
  onLoginStart,
  onLoginSuccess,
  onRegisterFail,
  onLoginFail,
} from "../users/users.reducer";
import config from "../../config.json";
import axios from "axios";

function* workRegister({ payload }) {
  try {
    const {
      data: { message },
    } = yield axios.post(config.baseUrl + "/api/users/register", payload.values);
    yield put(onRegisterSuccess(message));
    payload.navigate("/login");
  } catch (error) {
    yield put(onRegisterFail(error?.response?.data?.message));
  }
}

function* workLogin({ payload }) {
  try {
    const {
      data: { username, data, message, role },
    } = yield axios.post(config.baseUrl + "/api/auth/login", payload.values);
    yield put(onLoginSuccess({ data, message, username, role }));
    payload.navigate(`/${username}`);
  } catch (error) {
    yield put(onLoginFail(error?.response?.data?.message));
  }
}

function* usersSaga() {
  yield takeLatest(onRegisterStart.type, workRegister);
  yield takeLatest(onLoginStart.type, workLogin);
}

export default usersSaga;
