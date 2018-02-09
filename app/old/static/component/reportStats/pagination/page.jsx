import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Page extends Component {
  static propTypes = {
    page:             PropTypes.number,
    handleChangePage: PropTypes.func,
  };

  handleApply = () => {
    this.props.handleChangePage(this.props.page);
  };

  render() {
    const {
      page,
      selected,
    } = this.props;

    return (
      <span onClick={this.handleApply}
            onKeyPress={this.handleApply}
            className={`report-pagination-item ${selected ? '-selected' : ''}`}
      >{page}
      </span>
    );
  }
}

export default Page;
