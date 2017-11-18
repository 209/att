import { combineReducers } from 'redux';
import ticketsListReducer from './store/ticketsList/reducer';

const mainReducer = combineReducers({
  ticketsList: ticketsListReducer,
});

const rootReducer = (state, action) => mainReducer(state, action);

export default rootReducer;
