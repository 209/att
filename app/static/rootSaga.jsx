import { all } from 'redux-saga/effects';
import usersSaga from './store/users/sagas';

export default function* rootSaga() {
  yield all([
    ...usersSaga(),
  ]);
}
