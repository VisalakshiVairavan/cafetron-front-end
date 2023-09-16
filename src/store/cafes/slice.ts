import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CAFES, CafeStateType, CafeType } from "./types";
import { EmployeeType } from "../employees/types";

const cafeInitialState: CafeStateType = {
  cafes: {
    data: null,
    isLoading: false,
    errors: "",
  },
};

export const cafeSlice = createSlice({
  name: CAFES,
  initialState: cafeInitialState,
  reducers: {
    getCafesAction: (
      state: CafeStateType,
      { payload: location }: PayloadAction<string>
    ) => {
      state.cafes.isLoading = true;
      state.cafes.errors = "";
    },
    getCafesSuccessAction: (
      state: CafeStateType,
      { payload: cafes }: PayloadAction<CafeType[]>
    ) => {
      state.cafes.isLoading = false;
      state.cafes.data = cafes;
    },
    getCafesErrorAction: (
      state: CafeStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.cafes.isLoading = false;
      state.cafes.errors = error;
    },
    deleteCafeAction: (
      state: CafeStateType,
      { payload: cafeId }: PayloadAction<string>
    ) => {},
    deleteCafeSuccessAction: (
      state: CafeStateType,
      { payload: cafeId }: PayloadAction<string>
    ) => {
      state.cafes.data =
        state.cafes.data?.filter((cafe) => cafe.cafeId !== cafeId) || [];
    },
    // updateCafesEmpDeleteAction: (
    //   state: CafeStateType,
    //   { payload: empCafeId }: PayloadAction<string>
    // ) => {
    //   if (state.cafes.data?.length && empCafeId) {
    //     console.log("updateCafesEmpDeleteAction", empCafeId);
    //     const updatedCafe = state.cafes.data?.find(
    //       (cafe) => cafe.cafeId === empCafeId
    //     );
    //     console.log("updatedCafe", updatedCafe);
    //     if (updatedCafe) {
    //       updatedCafe.employee_count = --updatedCafe.employee_count;
    //       console.log("state.cafes.data", state.cafes.data);
    //       state.cafes.data = [
    //         ...state.cafes.data.filter((cafe) => cafe.cafeId !== empCafeId),
    //         { ...updatedCafe, employee_count: --updatedCafe.employee_count },
    //       ];
    //       console.log("state.cafes.data", state.cafes.data);
    //     }
    //   }
    // },
  },
});

export const {
  getCafesAction,
  getCafesSuccessAction,
  getCafesErrorAction,
  deleteCafeAction,
  deleteCafeSuccessAction,
} = cafeSlice.actions;
export default cafeSlice.reducer;
