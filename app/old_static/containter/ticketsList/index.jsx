import React from 'react';
import { connect } from 'react-redux';
import TicketsList from 'component/statistics';
import { fetchTickets } from 'store/statistics/actions';
import { getTickets } from 'store/statistics/selectors';

const Container = connect(state => ({
  ticketsList: getTickets(state),
}), {
  fetchTickets,
})(TicketsList);

export default Container;
