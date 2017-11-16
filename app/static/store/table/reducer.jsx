import { makeReducer } from '../../utils/redux';
import * as actionTypes from './actionTypes';

const initialState = {
  page:  1,
  limit: 20,
};

const reducer = makeReducer(initialState, {

  [actionTypes.CHANGE_PAGE]: (state, action) => {
    return {
      ...state,
      page: action.page,
    };
  },

});

export default reducer;
