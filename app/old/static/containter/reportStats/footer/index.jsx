import React from 'react';
import { connect } from 'react-redux';
import Footer from 'component/reportStats/footer';
import {
  getTotalPages,
  getTotal,
  getPage,
  getRecordBegin,
  getRecordEnd,
} from 'store/local/reportStats/selectors';
import { changePage } from 'store/local/reportStats/actions';

const Container = connect(state => ({
  page:       getPage(state),
  total:      getTotal(state),
  totalPages: getTotalPages(state),
  begin:      getRecordBegin(state),
  end:        getRecordEnd(state),
}), {
  handleChangePage: changePage,
})(Footer);

export default Container;
