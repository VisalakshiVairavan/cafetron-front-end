export type EmployeeType = {
  name: string;
  email_address: string;
  phone_number: string;
  days_worked: number;
  cafe: string;
  cafe_id: string;
  id: string;
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
export type CAFES_TYPE = typeof EMPLOYEES;

export const GET_ALL_EMPLOYEES = `${EMPLOYEES}/getEmployeesAction`;
export type GET_ALL_CAFES_TYPES = typeof GET_ALL_EMPLOYEES;

export const DELETE_EMPLOYEE = `${EMPLOYEES}/deleteEmployeeAction`;
export type DELETE_CAFE_TYPES = typeof DELETE_EMPLOYEE;
