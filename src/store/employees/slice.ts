import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EMPLOYEES, EmployeeStateType, EmployeeType } from "./types";

const employeeInitialState: EmployeeStateType = {
  employees: {
    data: null,
    isLoading: false,
    errors: "",
  },
  deletePending: null,
  editPending: null,
  addPending: null,
};

export const employeeSlice = createSlice({
  name: EMPLOYEES,
  initialState: employeeInitialState,
  reducers: {
    getEmployeesAction: (
      state: EmployeeStateType,
      { payload: employeeId }: PayloadAction<string>
    ) => {
      state.employees.isLoading = true;
      state.employees.errors = "";
    },
    getEmployeesSuccessAction: (
      state: EmployeeStateType,
      { payload: employees }: PayloadAction<EmployeeType[]>
    ) => {
      state.employees.isLoading = false;
      state.employees.data = employees;
    },
    getEmployeesErrorAction: (
      state: EmployeeStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.employees.isLoading = false;
      state.employees.errors = error;
    },
    deleteEmployeeAction: (
      state: EmployeeStateType,
      { payload: employeeId }: PayloadAction<string>
    ) => {
    },
    deletePendingEmployeeAction: (
      state: EmployeeStateType,
      { payload: employeeId }: PayloadAction<string>
    ) => {
      state.deletePending =
        state.employees.data?.filter((d) => d.id === employeeId)[0] || null;
    },
    deleteEmployeeSuccessAction: (
      state: EmployeeStateType,
      { payload: employeeId }: PayloadAction<string>
    ) => {
      state.employees.data =
        state.employees.data?.filter((emp) => emp.id !== employeeId) || [];
      state.deletePending = null;
    },
  },
});

export const {
  getEmployeesAction,
  getEmployeesSuccessAction,
  getEmployeesErrorAction,
  deleteEmployeeAction,
  deleteEmployeeSuccessAction,
  deletePendingEmployeeAction
} = employeeSlice.actions;
export default employeeSlice.reducer;
