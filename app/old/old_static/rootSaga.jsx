import { all } from 'redux-saga/effects';
import ticketsListSaga from '../static/store/statistics/sagas';

export default function* rootSaga() {
  yield all([
    ...ticketsListSaga(),
  ]);
}
