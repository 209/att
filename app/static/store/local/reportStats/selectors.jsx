// @todo НЕ ОПТИМИЗИРОВАНО
// @todo для первичнно оптипмизации использовать reselect
// @todo для более глубокой - переделать
import sortBy from 'lodash-es/sortBy';
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

export const getChartData = state => {
  const stats = getStatistics(state);

  return sortBy(stats, [o => o.date]);
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

const matchTotalStats = arr => {
  const sumFields = [
    'searches',
    'clicks',
    'unique_clicks',
    'bookings',
    'sales',
  ];
  const avgFields = [
    'ctr',
    'str',
    'btr',
    'timeouts',
    'success',
    'zeros',
    'duration',
    'errors',
  ];

  const defaultMemo = sumFields.concat(avgFields).reduce((memo, item) => {
    memo[item] = 0;
    return memo;
  }, {});

  return arr.reduce((memo, item) => {
    sumFields.forEach(field => memo[field] += item[field]);
    avgFields.forEach(field => memo[field] += item[field] / arr.length);

    return memo;
  }, defaultMemo);
};

export const getTotalStats = state => {
  const stats = getStatistics(state);

  return matchTotalStats(stats);
};

export const getTotalPageStats = state => {
  const stats = getStatsPage(state);

  return matchTotalStats(stats);
};
