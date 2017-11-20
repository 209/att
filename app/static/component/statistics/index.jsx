import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.scss';

const columns = [{
  Header:   'Date',
  accessor: 'time',
  minWidth: 130,
}, {
  Header:   'Searches',
  accessor: 'searches',
  minWidth: 70,
}, {
  Header:   'Clicks',
  accessor: 'clicks',
  minWidth: 50,
}, {
  Header:   'Uniq. clicks',
  accessor: 'unique_clicks',
  minWidth: 90,
}, {
  Header:   'CTR',
  accessor: 'ctr',
  minWidth: 50,
}, {
  Header:   'Bookings',
  accessor: 'bookings',
  minWidth: 70,
}, {
  Header:   'Sales',
  accessor: 'sales',
  minWidth: 50,
}, {
  Header:   'BTR',
  accessor: 'btr',
  minWidth: 50,
}, {
  Header:   'STR',
  accessor: 'str',
  minWidth: 50,
}, {
  Header:   'Success %',
  accessor: 'success',
  minWidth: 75,
}, {
  Header:   'Errors %',
  accessor: 'errors',
  minWidth: 70,
}, {
  Header:   'Zeros %',
  accessor: 'zeros',
  minWidth: 70,
}, {
  Header:   'T/O %',
  accessor: 'timeouts',
  minWidth: 50,
}, {
  Header:   'Avg Resp',
  accessor: 'duration',
  minWidth: 70,
},];

class Statistics extends Component {
  static propTypes = {
    statistics:      PropTypes.array,
    fetchStatistics: PropTypes.func,
  };

  static defaultProps = {
    statistics: [],
  };

  componentDidMount() {
    this.props.fetchStatistics();
  }

  render() {
    const {
      statistics,
    } = this.props;

    return (
      <ReactTable
        data={statistics}
        columns={columns}
      />
    );
  }
}

export default Statistics;
