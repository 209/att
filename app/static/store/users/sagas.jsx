import { put, takeLatest, all, select } from 'redux-saga/effects';
import {
  getUsersMock,
  getUsersURLMock,
} from 'api/usersMock';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { getTerm, getNextPageUrl } from './selectors';

function* getUsers({ term }) {
  try {
    const {
      result,
      nextPageUrl,
      previousPageUrl,
    } = yield getUsersMock(term);

    yield put(actions.fetchUsersSuccess(result, nextPageUrl, previousPageUrl));
  } catch (e) {
    yield put(actions.fetchUsersFailure());
  }
}

function* nextUsers() {
  try {
    const users = yield select();

    const {
      result,
      nextPageUrl,
      previousPageUrl,
    } = yield getUsersURLMock(getTerm(users), getNextPageUrl(users));

    yield put(actions.nextUsersSuccess(result, nextPageUrl, previousPageUrl));
  } catch (e) {
    yield put(actions.nextUsersFailure());
  }
}


export default function* usersSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_USERS_REQUEST, getUsers),
    takeLatest(actionTypes.NEXT_USERS_REQUEST, nextUsers),
  ]);
}
