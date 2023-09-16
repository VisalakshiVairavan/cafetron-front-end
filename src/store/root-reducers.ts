import cafeReducers from "./cafes/slice";
import employeeReducer from './employees/slice';
import { CafeStateType } from "./cafes/types";
import { EmployeeStateType } from "./employees/types";

export type StateType = {
  cafes: CafeStateType;
  employees: EmployeeStateType;
};

const rootReducers = {
  cafes: cafeReducers,
  employees: employeeReducer
};

export default rootReducers;
