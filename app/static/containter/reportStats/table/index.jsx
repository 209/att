import React from 'react';
import { connect } from 'react-redux';
import Table from 'component/reportStats/table';
import { fetchStatistics } from 'store/entity/statistics/actions';
import {
  getLimit,
  getLimitOptions,
  getStatsPage,
} from 'store/local/reportStats/selectors';

const Container = connect(state => ({
  limit:        getLimit(state),
  limitOptions: getLimitOptions(state),
  statistics:   getStatsPage(state),
}), {
  fetchStatistics,
})(Table);

export default Container;
