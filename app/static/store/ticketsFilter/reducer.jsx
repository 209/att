import { MAX_COUNT_STOPS } from 'constants/index';
import range from 'lodash-es/range';
import clone from 'lodash-es/clone';
import { makeReducer } from '../../utils/redux';
import * as actionTypes from './actionTypes';


const initState = range(0, MAX_COUNT_STOPS, 0).map(() => true);

const reducer = makeReducer(initState, {
  [actionTypes.CHANGE_TICKETS_FILTER]: (state, action) => {
    return clone(action.filter);
  },
});

export default reducer;
