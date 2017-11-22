import { getStatistics } from 'store/entity/statistics/selectors';

export const getPage = state => state.reportStats.page;
export const getLimit = state => state.reportStats.limit;
export const getLimitOptions = state => state.reportStats.limitOptions;

export const getStatsPage = state => {
  const stats = getStatistics(state);
  const total = stats.length;
  const page = getPage(state);
  const limit = getLimit(state);


  const begin = (page - 1) * limit;
  const end = Math.min(page * limit, total);

  return stats.slice(begin, end);
};
