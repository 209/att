import { all } from 'redux-saga/effects';
import pokemonSaga from './store/pokemon/sagas';

export default function* rootSaga() {
  yield all([
    ...pokemonSaga(),
  ]);
}
