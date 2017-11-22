import { combineReducers } from 'redux';
import statistics from './store/entity/statistics/reducer';
import reportStats from './store/local/reportStats/reducer';

const mainReducer = combineReducers({
  statistics,
  reportStats,
});

const rootReducer = (state, action) => mainReducer(state, action);

export default rootReducer;
