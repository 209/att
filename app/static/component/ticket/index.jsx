import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Stops = props => (
  <span className="ticket-stops">
    {`${props.stops} пересадок`}
  </span>
);
const Time = ({ time }) => <span className="ticket-time">{time}</span>;
const Today = ({ date }) => <span>{date}</span>;
const Place = props => (
  <div className="ticket-place">
    <header>{props.place}</header>
    <footer>{props.date}</footer>
  </div>
);

const Buy = props => {
  return (
    <div className="ticket-buy">
      <header>{props.carrier}</header>
      <footer>
        <button>{`Купиь за ${props.price}р`}</button>
      </footer>
    </div>
  );
};
const Info = props => {
  return (
    <div className="ticket-info">
      <header>
        <Time time={props.departureTime} />
        <Stops stops={props.stops} />
        <Time time={props.arrivalTime} />
      </header>
      <footer>
        <Place place={`${props.origin}, ${props.originName}`} date={props.departureDate} />
        <Place place={`${props.destination}, ${props.destinationName}`} date={props.arrivalDate} />
      </footer>
    </div>
  );
};

class Ticket extends Component {
  static propTypes = {
    origin:          PropTypes.string,
    originName:      PropTypes.string,
    destination:     PropTypes.string,
    destinationName: PropTypes.string,
    departureDate:   PropTypes.string,
    departureTime:   PropTypes.string,
    arrivalDate:     PropTypes.string,
    arrivalTime:     PropTypes.string,
    carrier:         PropTypes.string,
    stops:           PropTypes.number,
    price:           PropTypes.number,

    today: PropTypes.string,
  };

  render() {
    return (
      <div className="ticket">
        <section>
          <Buy carrier={this.props.carrier} price={this.props.price} />
        </section>
        <section>
          <Info {...this.props} />
          <Today {...this.props} />
        </section>
      </div>
    );
  }
}

export default Ticket;
