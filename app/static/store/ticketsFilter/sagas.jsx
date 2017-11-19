import { put, call, takeLatest, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* getTickets() {
  try {

  } catch (err) {

  }
}

export default function* entitiesSaga() {
  yield all([
    //takeLatest(actionTypes.FETCH_TICKETS_REQUEST, getTickets),
  ]);
}
