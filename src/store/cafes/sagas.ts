import { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { CafeType, DELETE_CAFE, GET_ALL_CAFES } from "./types";
import {
  getCafesErrorAction,
  getCafesSuccessAction,
  deleteCafeSuccessAction,
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

function* deleteCafesSaga({ payload: cafeId }: PayloadAction<string>) {
  try {
    yield axiosInstance.delete("cafe", { params: { cafe_id: cafeId } });
    yield put(deleteCafeSuccessAction(cafeId));
  } catch (error: any) {
    yield put(getCafesErrorAction(error));
  }
}

export function* watchDeleteCafes() {
  yield takeLatest(DELETE_CAFE, deleteCafesSaga);
}
