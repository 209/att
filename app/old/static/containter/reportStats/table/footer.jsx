import React from 'react';
import { connect } from 'react-redux';
import Footer from 'component/reportStats/table/footer';
import {
  getTotalStats,
  getTotalPageStats,
} from 'store/local/reportStats/selectors';

const Container = connect(state => ({
  total:       getTotalStats(state),
  totalOnPage: getTotalPageStats(state),
}), {})(Footer);

export default Container;
