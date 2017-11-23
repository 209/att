// @todo Для оптипмизации использовать reselect

import { getStatistics } from 'store/entity/statistics/selectors';

export const getPage = state => state.reportStats.page;
export const getLimit = state => state.reportStats.limit;
export const getLimitOptions = state => state.reportStats.limitOptions;
export const getTotal = state => getStatistics(state).length;
export const getTotalPages = state => Math.ceil(getTotal(state) / getLimit(state));

export const getStatsPage = state => {
  const stats = getStatistics(state);
  const total = getTotal(state);
  const page = getPage(state);
  const limit = getLimit(state);

  const begin = (page - 1) * limit;
  const end = Math.min(page * limit, total);

  return stats.slice(begin, end);
};

export const getRecordBegin = state => {
  const page = getPage(state);
  const limit = getLimit(state);

  return ((page - 1) * limit) + 1;
};

export const getRecordEnd = state => {
  const total = getTotal(state);
  const page = getPage(state);
  const limit = getLimit(state);


  return Math.min(page * limit, total);
};
