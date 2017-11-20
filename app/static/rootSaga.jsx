import { all } from 'redux-saga/effects';
import statisticsSaga from './store/statistics/sagas';

export default function* rootSaga() {
  yield all([
    ...statisticsSaga(),
  ]);
}
