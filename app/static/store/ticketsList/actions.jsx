import { makeActionCreator } from '../../utils/redux';
import * as actionTypes from './actionTypes';

export const fetchTickets = makeActionCreator(actionTypes.FETCH_TICKETS_REQUEST);
export const fetchTicketsSuccess = makeActionCreator(actionTypes.FETCH_TICKETS_SUCCESS, 'ticketsList');
export const fetchTicketsFailure = makeActionCreator(actionTypes.FETCH_TICKETS_FAILURE);
