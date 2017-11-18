import { all } from 'redux-saga/effects';
import ticketsListSaga from './store/ticketsList/sagas';

export default function* rootSaga() {
  yield all([
    ...ticketsListSaga(),
  ]);
}
