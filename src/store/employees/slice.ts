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
  addPending: {
    name: "",
    email_address: "",
    phone_number: "",
    gender: "Female",
    cafe: "",
  },
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
    ) => {},
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
    addPendingEmployee: (
      state: EmployeeStateType,
      { payload: addPending }: PayloadAction<any>
    ) => {
      state.addPending = addPending;
    },
    addEmployeeAction: (
      state: EmployeeStateType,
      { payload: employee }: PayloadAction<EmployeeType | null>
    ) => {},
    addEmployeesSuccessAction: (
      state: EmployeeStateType,
      { payload: employee }: PayloadAction<EmployeeType>
    ) => {
      state.employees.data = [
        ...(state.employees.data?.filter((c) => c.id !== employee.id) || []),
        employee,
      ];
      state.addPending = null;
    },
    addEmployeesErrorAction: (
      state: EmployeeStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.addPending = null;
    },
    editPendingEmployee: (
      state: EmployeeStateType,
      { payload: editPending }: PayloadAction<any>
    ) => {
      state.editPending = editPending;
    },
    editEmployeeAction: (
      state: EmployeeStateType,
      { payload: employee }: PayloadAction<EmployeeType | null>
    ) => {},
    editEmployeesSuccessAction: (
      state: EmployeeStateType,
      { payload: employee }: PayloadAction<EmployeeType>
    ) => {
      state.employees.data = [
        ...(state.employees.data?.filter((c) => c.id !== employee.id) || []),
        employee,
      ];
      state.editPending = null;
    },
    editEmployeesErrorAction: (
      state: EmployeeStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.editPending = null;
    },
  },
});

export const {
  getEmployeesAction,
  getEmployeesSuccessAction,
  getEmployeesErrorAction,
  deleteEmployeeAction,
  deleteEmployeeSuccessAction,
  deletePendingEmployeeAction,
  addPendingEmployee,
  addEmployeeAction,
  addEmployeesSuccessAction,
  addEmployeesErrorAction,
  editPendingEmployee,
  editEmployeeAction,
  editEmployeesSuccessAction,
  editEmployeesErrorAction,
} = employeeSlice.actions;
export default employeeSlice.reducer;
