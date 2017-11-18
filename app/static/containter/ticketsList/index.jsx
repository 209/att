import React from 'react';
import { connect } from 'react-redux';
import TicketsList from 'component/ticketsList';
import { fetchTickets } from 'store/ticketsList/actions';
import { getTickets } from 'store/ticketsList/selectors';

const Container = connect(state => ({
  ticketsList: getTickets(state),
}), {
  fetchTickets,
})(TicketsList);

export default Container;
