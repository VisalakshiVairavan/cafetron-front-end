import { AxiosResponse } from "axios";
import { put,  takeLatest } from "redux-saga/effects";
import { EmployeeType, DELETE_EMPLOYEE, GET_ALL_EMPLOYEES } from "./types";
import {
  getEmployeesErrorAction,
  getEmployeesSuccessAction,
  deleteEmployeeSuccessAction,
} from "./slice";
import { axiosInstance } from "../../config/http";
import { PayloadAction } from "@reduxjs/toolkit";

function* getEmployeesSaga({ payload: cafe }: PayloadAction<string>) {
  try {
    const response: AxiosResponse<EmployeeType[]> = yield axiosInstance.get(
      "employee",
      { params: { cafe_id: cafe } }
    );
    yield put(getEmployeesSuccessAction(response.data));
  } catch (error: any) {
    yield put(getEmployeesErrorAction(error));
  }
}

export function* watchGetEmployees() {
  yield takeLatest(GET_ALL_EMPLOYEES, getEmployeesSaga);
}

function* deleteEmployeesSaga({ payload: employeeId }: PayloadAction<string>) {
  try {
    yield axiosInstance.delete("employee", {
      params: { employee_id: employeeId },
    });
    yield put(deleteEmployeeSuccessAction(employeeId));
  } catch (error: any) {
    yield put(getEmployeesErrorAction(error));
  }
}

export function* watchDeleteEmployees() {
  yield takeLatest(DELETE_EMPLOYEE, deleteEmployeesSaga);
}
