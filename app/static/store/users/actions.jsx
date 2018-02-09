import { makeActionCreator } from 'utils/redux';
import * as actionTypes from './actionTypes';

export const fetchUsers = makeActionCreator(actionTypes.FETCH_USERS_REQUEST, 'term');
export const fetchUsersSuccess = makeActionCreator(actionTypes.FETCH_USERS_SUCCESS, 'collection', 'nextPageUrl', 'previousPageUrl');
export const fetchUsersFailure = makeActionCreator(actionTypes.FETCH_USERS_FAILURE);

export const nextUsers = makeActionCreator(actionTypes.NEXT_USERS_REQUEST);
export const nextUsersSuccess = makeActionCreator(actionTypes.NEXT_USERS_SUCCESS, 'collection', 'nextPageUrl', 'previousPageUrl');
export const nextUsersFailure = makeActionCreator(actionTypes.NEXT_USERS_FAILURE);
