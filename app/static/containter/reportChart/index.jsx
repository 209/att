import React from 'react';
import { connect } from 'react-redux';
import Chart from 'component/reportChart';
import {
  getChartData,
} from 'store/local/reportStats/selectors';

const Container = connect(state => ({
  statistics: getChartData(state),
}), {})(Chart);

export default Container;
