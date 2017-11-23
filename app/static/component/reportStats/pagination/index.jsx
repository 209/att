import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from './page';
import './style.scss';

class Pagination extends Component {
  static propTypes = {
    page:             PropTypes.number,
    totalPages:       PropTypes.number,
    handleChangePage: PropTypes.func,
  };

  handleChangePage = page => {
    this.props.handleChangePage(page);
  };

  handleSetPreviousPage = () => {
    if (this.props.page === 1) {
      return;
    }
    this.props.handleChangePage(this.props.page - 1);
  };

  handleSetNextPage = () => {
    if (this.props.page === this.props.totalPages) {
      return;
    }
    this.props.handleChangePage(this.props.page + 1);
  };

  render() {
    const {
      page,
      totalPages,
    } = this.props;

    const pages = Array.apply(0, new Array(totalPages));

    return (
      <span className="report-pagination">
        <span className={`report-pagination-prev ${page === 1 ? '-disabled' : ''}`}
              onClick={this.handleSetPreviousPage}
              onKeyPress={this.handleSetPreviousPage}
        >
          Previous
        </span>
        {
          pages.map((x, i) => (<Page key={`key_${i + 1}`}
                                     page={i + 1}
                                     selected={(i + 1) === page}
                                     handleChangePage={this.handleChangePage}
          />))
        }
        <span className={`report-pagination-next ${page === totalPages ? '-disabled' : ''}`}
              onClick={this.handleSetNextPage}
              onKeyPress={this.handleSetNextPage}
        >
          Next
        </span>
      </span>
    );
  }
}

export default Pagination;
