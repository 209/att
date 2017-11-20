import { combineReducers } from 'redux';
import statisticsReducer from './store/statistics/reducer';

const mainReducer = combineReducers({
  statistics: statisticsReducer,
});

const rootReducer = (state, action) => mainReducer(state, action);

export default rootReducer;
