import { all } from 'redux-saga/effects';
import statisticsSaga from './store/entity/statistics/sagas';

export default function* rootSaga() {
  yield all([
    ...statisticsSaga(),
  ]);
}
