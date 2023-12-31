export type EmployeeType = {
  name: string;
  email_address: string;
  phone_number: string;
  gender: string;
  cafe?: string;
  days_worked?: number;
  cafe_id?: string;
  id?: string;
};

export type IEmployeeState = {
  data: EmployeeType[] | null;
  isLoading: boolean;
  errors: string;
};

export type EmployeeStateType = {
  employees: IEmployeeState;
  deletePending?: EmployeeType | null;
  editPending?: EmployeeType | null;
  addPending?: EmployeeType | null;
};

export const EMPLOYEES = "employees";
export type EMPLOYEES_TYPE = typeof EMPLOYEES;

export const GET_ALL_EMPLOYEES = `${EMPLOYEES}/getEmployeesAction`;
export type GET_ALL_EMPLOYEES_TYPES = typeof GET_ALL_EMPLOYEES;

export const DELETE_EMPLOYEE = `${EMPLOYEES}/deleteEmployeeAction`;
export type DELETE_EMPLOYEE_TYPES = typeof DELETE_EMPLOYEE;

export const ADD_EMPLOYEE = `${EMPLOYEES}/addEmployeeAction`;
export type ADD_EMPLOYEE_TYPES = typeof ADD_EMPLOYEE;

export const EDIT_EMPLOYEE = `${EMPLOYEES}/editEmployeeAction`;
export type EDIT_EMPLOYEE_TYPES = typeof EDIT_EMPLOYEE;
