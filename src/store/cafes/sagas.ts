import { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import {
  ADD_CAFE,
  CafeType,
  DELETE_CAFE,
  EDIT_CAFE,
  GET_ALL_CAFES,
} from "./types";
import {
  getCafesErrorAction,
  getCafesSuccessAction,
  deleteCafeSuccessAction,
  addCafesErrorAction,
  addCafesSuccessAction,
  editCafesSuccessAction,
  editCafesErrorAction,
} from "./slice";
import { axiosInstance } from "../../config/http";
import { PayloadAction } from "@reduxjs/toolkit";

function* getCafesSaga({ payload: location }: PayloadAction<string>) {
  try {
    const response: AxiosResponse<CafeType[]> = yield axiosInstance.get(
      "cafe",
      { params: { location } }
    );
    yield put(getCafesSuccessAction(response.data));
  } catch (error: any) {
    yield put(getCafesErrorAction(error));
  }
}

export function* watchGetCafes() {
  yield takeLatest(GET_ALL_CAFES, getCafesSaga);
}

function* deleteCafesSaga({ payload: id }: PayloadAction<string>) {
  try {
    yield axiosInstance.delete("cafe", { params: { cafe_id: id } });
    yield put(deleteCafeSuccessAction(id));
  } catch (error: any) {
    yield put(getCafesErrorAction(error));
  }
}

export function* watchDeleteCafes() {
  yield takeLatest(DELETE_CAFE, deleteCafesSaga);
}

function* addCafeSaga({ payload: cafe }: PayloadAction<CafeType>) {
  try {
    yield axiosInstance.post("cafe", cafe, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put(addCafesSuccessAction(cafe));
  } catch (error: any) {
    yield put(addCafesErrorAction(error));
  }
}

export function* watchAddCafe() {
  yield takeLatest(ADD_CAFE, addCafeSaga);
}

function* editCafeSaga({ payload: cafe }: PayloadAction<CafeType>) {
  try {
    yield axiosInstance.put("cafe", cafe, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put(editCafesSuccessAction(cafe));
  } catch (error: any) {
    yield put(editCafesErrorAction(error));
  }
}

export function* watchEditCafe() {
  yield takeLatest(EDIT_CAFE, editCafeSaga);
}
