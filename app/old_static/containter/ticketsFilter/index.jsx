import React from 'react';
import { connect } from 'react-redux';
import TicketsFilter from 'component/ticketsFilter';
import { getFilters, getFilter } from 'store/ticketsFilter/selectors';
import { changeTicketsFilter } from 'store/ticketsFilter/actions';

const Container = connect(state => ({
  filters:     getFilters(state),
  filter:      getFilter(state),
}), {
  changeTicketsFilter,
})(TicketsFilter);

export default Container;
