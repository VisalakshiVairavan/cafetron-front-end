export type CafeType = {
  name: string;
  description: string;
  location: string;
  employee_count: number;
  id?: string;
};

export type ICafeState = {
  data: CafeType[] | null;
  isLoading: boolean;
  errors: string;
};

export type CafeStateType = {
  cafes: ICafeState;
  deletePending: CafeType | null;
  addPending: CafeType | null;
  editPending: CafeType | null;
};

export const CAFES = "cafes";
export type CAFES_TYPE = typeof CAFES;

export const GET_ALL_CAFES = `${CAFES}/getCafesAction`;
export type GET_ALL_CAFES_TYPES = typeof GET_ALL_CAFES;

export const DELETE_CAFE = `${CAFES}/deleteCafeAction`;
export type DELETE_CAFE_TYPES = typeof DELETE_CAFE;

export const ADD_CAFE = `${CAFES}/addCafeAction`;
export type ADD_CAFE_TYPES = typeof ADD_CAFE;

export const EDIT_CAFE = `${CAFES}/editCafeAction`;
export type EDIT_CAFE_TYPES = typeof EDIT_CAFE;
