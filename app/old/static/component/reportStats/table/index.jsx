import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import columns from './columns';
import './style.scss';

class Statistics extends Component {
  static propTypes = {
    statistics:      PropTypes.array,
    fetchStatistics: PropTypes.func,
    limitOptions:    PropTypes.array,
    limit:           PropTypes.number,
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
      limitOptions,
      limit,
    } = this.props;

    return (
      <ReactTable
        data={statistics}
        columns={columns}
        pageSizeOptions={limitOptions}
        pageSize={limit}
        showPaginationTop={false}
        showPaginationBottom={false}
      />
    );
  }
}

export default Statistics;
