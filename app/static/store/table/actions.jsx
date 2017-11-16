import { makeActionCreator } from '../../utils/redux';
import * as actionTypes from './actionTypes';

export const changePage = makeActionCreator(actionTypes.CHANGE_PAGE, 'page');
