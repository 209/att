import { combineReducers } from 'redux';
import ticketsListReducer from '../static/store/statistics/reducer';
import ticketsFilterReducer from './store/ticketsFilter/reducer';

const mainReducer = combineReducers({
  ticketsList:   ticketsListReducer,
  ticketsFilter: ticketsFilterReducer,
});

const rootReducer = (state, action) => mainReducer(state, action);

export default rootReducer;
