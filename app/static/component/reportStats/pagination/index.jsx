import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Page = ({ page, selected, handleChangePage }) => {
  const apply = () => handleChangePage(page);

  return (
    <span onClick={apply}
          onKeyPress={apply}
          className={`report-pagination-item ${selected ? '-selected' : ''}`}
    >{page}
    </span>
  );
};

class Pagination extends Component {
  static propTypes = {
    page:             PropTypes.number,
    totalPages:       PropTypes.number,
    handleChangePage: PropTypes.func,
  };

  renderPages() {
    const arr = [];
    const {
      page,
      totalPages,
      handleChangePage,
    } = this.props;

    for (let i = 1; i < totalPages; i += 1) {
      arr.push(<Page key={`key_${i}`} page={i} selected={i === page} handleChangePage={handleChangePage} />);
    }

    return arr;
  }

  render() {
    const {
      page,
      totalPages,
    } = this.props;

    return (
      <span className="report-pagination">
        <span className={`report-pagination-prev ${page === 1 ? '-disabled' : ''}`}>Previous</span>
        <span>{this.renderPages()}</span>
        <span className={`report-pagination-next ${page === totalPages ? '-disabled' : ''}`}>Next</span>
      </span>
    );
  }
}

export default Pagination;
