import { AxiosResponse } from "axios";
import { put,  takeLatest } from "redux-saga/effects";
import { EmployeeType, DELETE_EMPLOYEE, GET_ALL_EMPLOYEES, ADD_EMPLOYEE, EDIT_EMPLOYEE } from "./types";
import {
  getEmployeesErrorAction,
  getEmployeesSuccessAction,
  deleteEmployeeSuccessAction,
  addEmployeesErrorAction,
  addEmployeesSuccessAction,
  editEmployeesErrorAction,
  editEmployeesSuccessAction,
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


function* addEmployeeSaga({ payload: employee }: PayloadAction<EmployeeType>) {
  try {
    yield axiosInstance.post("employee", employee, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put(addEmployeesSuccessAction(employee));
  } catch (error: any) {
    yield put(addEmployeesErrorAction(error));
  }
}

export function* watchAddEmployee() {
  yield takeLatest(ADD_EMPLOYEE, addEmployeeSaga);
}

function* editEmployeeSaga({ payload: employee }: PayloadAction<EmployeeType>) {
  try {
    yield axiosInstance.put("employee", employee, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put(editEmployeesSuccessAction(employee));
  } catch (error: any) {
    yield put(editEmployeesErrorAction(error));
  }
}

export function* watchEditEmployee() {
  yield takeLatest(EDIT_EMPLOYEE, editEmployeeSaga);
}