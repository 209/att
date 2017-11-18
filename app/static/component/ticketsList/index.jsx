import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ticket from 'component/ticket';

class TicketsList extends Component {
  static propTypes = {
    ticketsList:  PropTypes.array,
    fetchTickets: PropTypes.func,
  };

  componentDidMount() {
    this.props.fetchTickets();
  }

  render() {
    const { ticketsList } = this.props;

    return (
      <div>
        {ticketsList.map(ticket => <Ticket {...ticket} key={ticket.uid} />)}
      </div>
    );
  }
}

export default TicketsList;
