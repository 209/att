import { makeActionCreator } from 'utils/redux';
import * as actionTypes from './actionTypes';

export const fetchStatistics = makeActionCreator(actionTypes.FETCH_STATISTICS_REQUEST);
export const fetchStatisticsSuccess = makeActionCreator(actionTypes.FETCH_STATISTICS_SUCCESS, 'statistics');
export const fetchStatisticsFailure = makeActionCreator(actionTypes.FETCH_STATISTICS_FAILURE);

export const changePage = makeActionCreator(actionTypes.CHANGE_PAGE);
export const changePageLimit = makeActionCreator(actionTypes.CHANGE_PAGE_LIMIT);
