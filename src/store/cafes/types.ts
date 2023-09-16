export type CafeType = {
  name: string;
  description: string;
  location: string;
  employee_count: number;
  cafeId: string;
};

export type ICafeState = {
  data: CafeType[] | null;
  isLoading: boolean;
  errors: string;
};

export type CafeStateType = {
  cafes: ICafeState;
};

export const CAFES = "cafes";
export type CAFES_TYPE = typeof CAFES;

export const GET_ALL_CAFES = `${CAFES}/getCafesAction`;
export type GET_ALL_CAFES_TYPES = typeof GET_ALL_CAFES;


export const DELETE_CAFE = `${CAFES}/deleteCafeAction`;
export type DELETE_CAFE_TYPES = typeof DELETE_CAFE;