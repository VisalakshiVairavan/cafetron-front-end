import React from "react";
import { StateType } from "../../store/root-reducers";
import { editCafeAction, editPendingCafe } from "../../store/cafes/slice";
import CafeForm from "../../components/CafeForm";
import { useSelector } from "react-redux";

function EditCafe() {
  const { editPending } = useSelector((state: StateType) => state.cafes);

  return (
    <CafeForm
      isEdit={true}
      cafe={editPending}
      updateTempEvent={editPendingCafe}
      updateEvent={editCafeAction}
    />
  );
}

export default EditCafe;
