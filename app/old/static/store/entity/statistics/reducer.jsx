import { makeReducer } from 'utils/redux';
import * as actionTypes from './actionTypes';

const reducer = makeReducer([], {
  [actionTypes.FETCH_STATISTICS_SUCCESS]: (state, action) => action.statistics,
});

export default reducer;
