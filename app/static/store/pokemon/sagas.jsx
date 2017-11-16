import { put, call, takeLatest, select, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { getPockemons, getDataFromUrl } from '../../api/pokeapi';
import * as pokemonSelectors from './selectors';

function* getPockemones() {
  try {
    const response = yield getPockemons();

    debugger;

    const urls = response.results.map(pockemon => pockemon.url);
    const ids = response.results.map(pockemon => pockemon.name);

    yield put(actions.fetchPockemonesSuccess(ids));
  } catch (err) {
    yield put(actions.fetchPockemonesFailure());
    return {};
  }
}

function* replyGetPockemones() {
  yield delay(5000);
  yield call(getPockemones);
}


export default function* entitiesSaga() {
  yield all([
    takeLatest(actionTypes.FETCH_POCKEMONES_REQUEST, getPockemones),
    takeLatest(actionTypes.FETCH_POCKEMONES_FAILURE, replyGetPockemones),
  ]);
}
