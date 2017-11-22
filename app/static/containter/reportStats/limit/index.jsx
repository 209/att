import React from 'react';
import { connect } from 'react-redux';
import Limit from 'component/reportStats/limit';
import { getLimit, getLimitOptions } from 'store/local/reportStats/selectors';
import { changePage, changePageLimit } from 'store/local/reportStats/actions';

const Container = connect(state => ({
  limit:        getLimit(state),
  limitOptions: getLimitOptions(state),
}), {
  handleChange: changePageLimit,
})(Limit);

export default Container;
