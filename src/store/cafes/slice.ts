import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CAFES, CafeStateType, CafeType } from "./types";

const cafeInitialState: CafeStateType = {
  cafes: {
    data: null,
    isLoading: false,
    errors: "",
  },
  deletePending: null,
  addPending: {
    name: "",
    location: "",
    description: "",
    employee_count: 0,
  },
  editPending: null,
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
      { payload: id }: PayloadAction<string>
    ) => {},
    deleteCafeSuccessAction: (
      state: CafeStateType,
      { payload: id }: PayloadAction<string>
    ) => {
      state.cafes.data =
        state.cafes.data?.filter((cafe) => cafe.id !== id) || [];
    },
    addPendingCafe: (
      state: CafeStateType,
      { payload: addPending }: PayloadAction<any>
    ) => {
      state.addPending = addPending;
    },
    addCafeAction: (
      state: CafeStateType,
      { payload: cafe }: PayloadAction<CafeType | null>
    ) => {},
    addCafesSuccessAction: (
      state: CafeStateType,
      { payload: cafe }: PayloadAction<CafeType>
    ) => {
      state.cafes.data = [
        ...(state.cafes.data?.filter((c) => c.id !== cafe.id) || []),
        cafe,
      ];
      state.addPending = null;
    },
    addCafesErrorAction: (
      state: CafeStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.addPending = null;
    },
    editPendingCafe: (
      state: CafeStateType,
      { payload: editPending }: PayloadAction<any>
    ) => {
      state.editPending = editPending;
    },
    editCafeAction: (
      state: CafeStateType,
      { payload: cafe }: PayloadAction<CafeType | null>
    ) => {},
    editCafesSuccessAction: (
      state: CafeStateType,
      { payload: cafe }: PayloadAction<CafeType>
    ) => {
      state.cafes.data = [
        ...(state.cafes.data?.filter((c) => c.id !== cafe.id) || []),
        cafe,
      ];
      state.editPending = null;
    },
    editCafesErrorAction: (
      state: CafeStateType,
      { payload: error }: PayloadAction<string>
    ) => {
      state.editPending = null;
    },
  },
});

export const {
  getCafesAction,
  getCafesSuccessAction,
  getCafesErrorAction,
  deleteCafeAction,
  deleteCafeSuccessAction,
  addPendingCafe,
  addCafeAction,
  addCafesSuccessAction,
  addCafesErrorAction,
  editPendingCafe,
  editCafeAction,
  editCafesSuccessAction,
  editCafesErrorAction,
} = cafeSlice.actions;
export default cafeSlice.reducer;
