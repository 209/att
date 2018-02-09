import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Ticket from 'component/ticket';
import './style.scss';

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
      <div className="ticket-list">
        {ticketsList.map(ticket => <Ticket {...ticket} key={ticket.uid} />)}
      </div>
    );
  }
}

export default TicketsList;
