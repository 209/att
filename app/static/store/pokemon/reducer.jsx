import { makeReducer } from '../../utils/redux';
import * as actionTypes from './actionTypes';

const reducer = makeReducer([], {

  [actionTypes.FETCH_POCKEMONES_SUCCESS]: (state, action) => (action.pockemones),

});

export default reducer;
