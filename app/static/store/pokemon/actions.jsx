import { makeActionCreator } from '../../utils/redux';
import * as actionTypes from './actionTypes';

export const fetchPockemones = makeActionCreator(actionTypes.FETCH_POCKEMONES_REQUEST);
export const fetchPockemonesSuccess = makeActionCreator(actionTypes.FETCH_POCKEMONES_SUCCESS, 'pockemones');
export const fetchPockemonesFailure = makeActionCreator(actionTypes.FETCH_POCKEMONES_FAILURE);
