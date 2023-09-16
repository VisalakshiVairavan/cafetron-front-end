import React from "react";
import { StateType } from "../../store/root-reducers";
import {
  editEmployeeAction,
  editPendingEmployee,
} from "../../store/employees/slice";
import EmployeeForm from "../../components/EmployeeForm";
import { useSelector } from "react-redux";

function EditEmployee() {
  const { editPending } = useSelector((state: StateType) => state.employees);

  return (
    <EmployeeForm
      isEdit={true}
      employee={editPending}
      updateTempEvent={editPendingEmployee}
      updateEvent={editEmployeeAction}
    />
  );
}

export default EditEmployee;
