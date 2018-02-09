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

  generatePages() {
    const { totalPages, page } = this.props;
    const arr = [];
    const period = 5;
    const pageStart = Math.min(page, totalPages - period);

    let key = 0;

    if (page >= totalPages - period) {
      arr.push({
        key,
        page: 1,
      }, {
        key:  key + 1,
        page: 'divider',
      });
      key = 2;
    }

    for (let i = pageStart; i <= pageStart + period; i += 1) {
      arr.push({
        key,
        page: i,
      });
      key += 1;
    }

    if (totalPages - period > pageStart) {
      arr.push({
        key,
        page: 'divider',
      }, {
        key:  key + 1,
        page: totalPages,
      });
    }

    return arr;
  }

  render() {
    const {
      page,
      totalPages,
    } = this.props;

    const pages = this.generatePages();

    return (
      <span className="report-pagination">
        <span className={`report-pagination-prev ${page === 1 ? '-disabled' : ''}`}
              onClick={this.handleSetPreviousPage}
              onKeyPress={this.handleSetPreviousPage}
        >
          Previous
        </span>
        {
          pages.map(item => {
            if (item.page === 'divider') {
              return <span key={`${item.key}`}>...</span>;
            }

            return (
              <Page key={`${item.key}`}
                    page={item.page}
                    selected={item.page === page}
                    handleChangePage={this.handleChangePage}
              />
            );
          })
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
