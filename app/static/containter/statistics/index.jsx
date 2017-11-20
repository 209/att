import React from 'react';
import { connect } from 'react-redux';
import Statistics from 'component/statistics';
import { fetchStatistics } from 'store/statistics/actions';
import { getStatistics } from 'store/statistics/selectors';

const Container = connect(state => ({
  statistics: getStatistics(state),
}), {
  fetchStatistics,
})(Statistics);

export default Container;
