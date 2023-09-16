import React from "react";
import { StateType } from "../../store/root-reducers";

import { useSelector } from "react-redux";
import EmployeeForm from "../../components/EmployeeForm";
import {
  addEmployeeAction,
  addPendingEmployee,
} from "../../store/employees/slice";
import { useLocation } from "react-router-dom";

function AddEmployee() {
  const { addPending } = useSelector((state: StateType) => state.employees);
  const location = useLocation();
  return (
    <EmployeeForm
      cafeId={location?.state?.id}
      employee={addPending}
      updateTempEvent={addPendingEmployee}
      updateEvent={addEmployeeAction}
    />
  );
}

export default AddEmployee;
