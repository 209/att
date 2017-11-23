import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class Limit extends Component {
  static propTypes = {
    limit:        PropTypes.number,
    limitOptions: PropTypes.array,
    handleChange: PropTypes.func,
  };

  handleChange = event => {
    this.props.handleChange(event.target.value);
  };

  render() {
    const {
      limit,
      limitOptions,
    } = this.props;

    return (
      <div className="report-limit">
        <span>Show</span>
        <select className="report-limit-select" onChange={this.handleChange} value={limit}>
          {
            limitOptions.map((lim, index) => {
              const key = `lo_${index}`;
              return <option key={key} value={lim}>{`${lim}`}</option>;
            })
          }
        </select>
        <span>entries</span>
      </div>
    );
  }
}

export default Limit;
