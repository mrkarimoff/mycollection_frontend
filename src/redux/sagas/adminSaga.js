import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import config from "../../config.json";
import { getLocalToken } from "../../utils/localStorage.service";
import {
  deleteUsers,
  getUsers,
  getUsersFail,
  getUsersSuccess,
  updateUsers,
} from "../admin/admin.reducer";

function* workGetUsers() {
  try {
    const response = yield axios.get(config.baseUrl + "/api/admin/users", {
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    yield put(getUsersSuccess(response.data));
  } catch (error) {
    console.log(error);
    yield put(getUsersFail(error?.response?.data?.message));
  }
}

function* workUpdateUsers({ payload }) {
  try {
    const response = yield axios.put(config.baseUrl + "/api/admin/users", payload.update, {
      params: { ids: payload.ids },
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    const admin = response?.data?.users?.find((user) => user._id === response.data.adminId);
    if (admin) payload.navigate("/login");
    yield call(workGetUsers);
  } catch (error) {
    console.log(error);
  }
}

function* workDeleteUsers({ payload }) {
  try {
    const response = yield axios.delete(config.baseUrl + "/api/admin/users", {
      params: { ids: payload.ids },
      headers: { Authorization: `Bearer ${getLocalToken()}` },
    });
    const admin = response?.data?.users?.find((user) => user._id === response.data.adminId);
    if (admin) payload.navigate("/login");
    yield call(workGetUsers);
  } catch (error) {
    console.log(error);
  }
}

function* adminSaga() {
  yield takeLatest(getUsers.type, workGetUsers);
  yield takeLatest(updateUsers.type, workUpdateUsers);
  yield takeLatest(deleteUsers.type, workDeleteUsers);
}

export default adminSaga;
