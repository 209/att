import { put, takeLatest, all } from 'redux-saga/effects';
import {
  getStatisticsApi as fetchStatisticsApi,
} from 'api/statistics';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* getStatistics() {
  const {
    data,
  } = yield fetchStatisticsApi();

  yield put(actions.fetchStatisticsSuccess(data));
}

export default function* entitiesSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_STATISTICS_REQUEST, getStatistics),
  ]);
}
