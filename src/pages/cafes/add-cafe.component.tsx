import React from "react";
import { StateType } from "../../store/root-reducers";
import { addCafeAction, addPendingCafe } from "../../store/cafes/slice";
import CafeForm from "../../components/CafeForm";
import { useSelector } from "react-redux";

function AddCafe() {
  const { addPending } = useSelector((state: StateType) => state.cafes);

  return (
    <CafeForm
      cafe={addPending}
      updateTempEvent={addPendingCafe}
      updateEvent={addCafeAction}
    />
  );
}

export default AddCafe;
