import { combineReducers } from 'redux';
import users from './store/users/reducer';

const mainReducer = combineReducers({
  users,
});

const rootReducer = (state, action) => mainReducer(state, action);

export default rootReducer;
