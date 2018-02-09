import { makeReducer } from '../../utils/redux';
import * as actionTypes from './actionTypes';

const reducer = makeReducer([], {

  [actionTypes.FETCH_TICKETS_SUCCESS]: (state, action) => action.ticketsList,

});

export default reducer;
