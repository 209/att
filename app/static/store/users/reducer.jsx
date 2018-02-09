import { makeReducer } from 'utils/redux';
import processStates from 'constants/processStates';
import * as actionTypes from './actionTypes';

const defaultState = {
  term:            '',
  status:          processStates.Ready,
  collection:      [],
  nextPageUrl:     '',
  previousPageUrl: '',
};

const reducer = makeReducer(defaultState, {
  [actionTypes.FETCH_USERS_REQUEST]: (state, action) => ({
    ...state,
    term:   action.term,
    status: processStates.Process,
  }),
  [actionTypes.FETCH_USERS_SUCCESS]: (state, action) => ({
    collection:      action.collection,
    nextPageUrl:     action.nextPageUrl,
    previousPageUrl: action.previousPageUrl,
    status:          processStates.Ready,
  }),
  [actionTypes.FETCH_USERS_FAILURE]: (state, action) => ({
    ...state,
    nextPageUrl:     '',
    previousPageUrl: '',
    status:          processStates.Error,
  }),
  [actionTypes.NEXT_USERS_REQUEST]:  (state, action) => ({
    ...state,
    status: processStates.Process,
  }),
  [actionTypes.NEXT_USERS_SUCCESS]:  (state, action) => ({
    ...state,
    collection:      {
      ...state.collection,
      ...action.collection,
    },
    nextPageUrl:     action.nextPageUrl,
    previousPageUrl: action.previousPageUrl,
    status:          processStates.Ready,
  }),
  [actionTypes.NEXT_USERS_FAILURE]:  (state, action) => ({
    ...state,
    nextPageUrl:     '',
    previousPageUrl: '',
    status:          processStates.Error,
  }),
});

export default reducer;
