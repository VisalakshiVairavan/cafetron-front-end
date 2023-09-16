import { all, fork } from "redux-saga/effects";
import {
  watchGetCafes,
  watchDeleteCafes,
  watchAddCafe,
  watchEditCafe,
} from "./cafes/sagas";
import {
  watchAddEmployee,
  watchDeleteEmployees,
  watchEditEmployee,
  watchGetEmployees,
} from "./employees/sagas";

const rootSaga = function* () {
  yield all([
    fork(watchGetCafes),
    fork(watchDeleteCafes),
    fork(watchDeleteEmployees),
    fork(watchGetEmployees),
    fork(watchAddCafe),
    fork(watchEditCafe),
    fork(watchEditEmployee),
    fork(watchAddEmployee),
  ]);
};

export default rootSaga;
