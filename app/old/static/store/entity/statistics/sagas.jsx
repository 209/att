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

  const result = data.map(item => ({
    searches:      item.searches,
    clicks:        item.clicks,
    unique_clicks: item.unique_clicks,
    bookings:      item.bookings,
    sales:         item.sales,
    date:          item.time,
    ctr:           Number(item.ctr),
    str:           Number(item.str),
    duration:      Number(item.duration),
    errors:        Number(item.errors),
    btr:           Number(item.btr),
    timeouts:      Number(item.timeouts),
    zeros:         Number(item.zeros),
    success:       Number(item.success),
  }));

  yield put(actions.fetchStatisticsSuccess(result));
}

export default function* entitiesSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_STATISTICS_REQUEST, getStatistics),
  ]);
}
