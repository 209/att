import { makeReducer } from 'utils/redux';
import * as actionTypes from './actionTypes';

const initState = {
  page:         1,
  limit:        10,
  limitOptions: [5, 10, 20, 25, 50, 100],
};

const reducer = makeReducer(initState, {
  [actionTypes.CHANGE_PAGE_LIMIT]: (state, action) => ({
    ...state,
    limit: Number(action.limit),
  }),

  [actionTypes.CHANGE_PAGE]: (state, action) => ({
    ...state,
    page: Number(action.page),
  }),
});

export default reducer;
