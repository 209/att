import { put, takeLatest, all } from 'redux-saga/effects';
import {
  getUsersMock,
  getUsersURLMock,
} from 'api/usersMock';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* getUsers({ term }) {
  try {
    const {
      result,
      nextPageUrl,
      previousPageUrl,
    } = yield getUsersMock(term);

    yield put(actions.fetchUsersSuccess({
      collection: result,
      nextPageUrl,
      previousPageUrl,
    }));
  } catch {
    yield put(actions.fetchUsersFailure());
  }
}

function* nextUsers() {
  try {
    const {
      result,
      nextPageUrl,
      previousPageUrl,
    } = yield getUsersURLMock(url);

    yield put(actions.nextUsersSuccess({
      collection: result,
      nextPageUrl,
      previousPageUrl,
    }));
  } catch {
    yield put(actions.nextUsersFailure());
  }
}


export default function* usersSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_USERS_REQUEST, getUsers),
    takeLatest(actionTypes.NEXT_USERS_REQUEST, nextUsers),
  ]);
}
