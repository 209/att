import { makeActionCreator } from '../../utils/redux';
import * as actionTypes from './actionTypes';

export const changeTicketsFilter = makeActionCreator(actionTypes.CHANGE_TICKETS_FILTER, 'filter');
