import { combineReducers } from 'redux';
import pokemonReducer from './store/pokemon/reducer';

const mainReducer = combineReducers({
  pockemones: pokemonReducer,
});

const rootReducer = (state, action) => mainReducer(state, action);

export default rootReducer;
