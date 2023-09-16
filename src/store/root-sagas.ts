import { all, fork } from "redux-saga/effects";
import { watchGetCafes, watchDeleteCafes } from "./cafes/sagas";
import { watchDeleteEmployees, watchGetEmployees } from "./employees/sagas";

const rootSaga = function* () {
  yield all([
    fork(watchGetCafes),
    fork(watchDeleteCafes),
    fork(watchDeleteEmployees),
    fork(watchGetEmployees),
  ]);
};

export default rootSaga;
